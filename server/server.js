// Required Dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Pool, Client } = require('pg')
const path = require('path')

// Load environment variables
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, '../.env') })

// Import routes
const EventsRoutes = require('./routes/mongodb/EventsRoutes')
const EntitiesRoutes = require('./routes/mongodb/EntityRoutes')
const VehiclesRoutes = require('./routes/mongodb/VehicleRoutes')

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
		console.log('\x1b[36mMongoDB:\x1b[0m connected \x1b[32msucessfully\x1b[0m')
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
	.then(() => {
		console.log('\x1b[36mPostgreSQL:\x1b[0m connected \x1b[32msucessfully\x1b[0m')
		createTables()
	})
	.catch((err) => console.error('\x1b[31mPostgreSQL connection error:', err, '\x1b[0m'))

// Middleware to add pool to each request
app.use((req, res, next) => {
	// @ts-ignore
	req.dbPool = pool
	next()
})

// Create tables in PostgreSQL
const createTables = async () => {
	try {
		await postgresClient.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY
            );
						CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY
            );
        `)
		console.log('\x1b[36mPostgreSQL:\x1b[0m tables created \x1b[32msucessfully\x1b[0m')
	} catch (error) {
		console.error('\x1b[31mPostgreSQL connection error:', error, '\x1b[0m')
	}
}

// Routes
app.use('/api/events', EventsRoutes)
app.use('/api/entities', EntitiesRoutes)
app.use('/api/vehicles', VehiclesRoutes)

// To test creat a GET http://localhost:5000/test on Postman
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

// Export the pool object
module.exports = {
	app,
	pool,
}
