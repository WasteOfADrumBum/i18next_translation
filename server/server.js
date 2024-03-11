// Required Dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Pool, Client } = require('pg')
const fs = require('fs')
const path = require('path')

// Load environment variables
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env') })

// Import routes
const EventsRoutes = require('./routes/EventsRoutes')

// Create a writable stream to a log file
const logStream = fs.createWriteStream('pool.log', { flags: 'a' })

// Create Express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/eventDB')
	.then(() => {
		console.log('\x1b[32mMongoDB connected\x1b[0m')
	})
	.catch((error) => {
		console.error('\x1b[31mError:', error.message, '\x1b[0m')
		process.exit(1)
	})

// Create a PostgreSQL connection pool
const pool = new Pool({
	connectionString: process.env.POSTGRES_CONNECTION_STRING,
})

// Connect to PostgreSQL
const postgresClient = new Client({
	connectionString: process.env.POSTGRES_CONNECTION_STRING,
})
// Connect to PostgreSQL
postgresClient
	.connect()
	.then(() => console.log('\x1b[32mPostgreSQL connected\x1b[0m'))
	.catch((err) => console.error('\x1b[31mPostgreSQL connection error:', err, '\x1b[0m'))

// Middleware to add pool to each request
app.use((req, res, next) => {
	// @ts-ignore
	req.dbPool = pool
	next()
})

// Routes
app.use('/api/events', EventsRoutes)

app.get('/test', async (req, res) => {
	try {
		// @ts-ignore
		const client = await req.dbPool.connect()
		const result = await client.query('SELECT $1::text as message', ['Hello PostgreSQL'])
		client.release()
		res.json(result.rows)
	} catch (err) {
		console.error('Error executing query:', err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

// Log server start
app.listen(PORT, () => {
	console.log('\x1b[36mServer is running on port\x1b[0m', PORT)
})

// Enable debug logging for your application
require('debug').enable('*')
