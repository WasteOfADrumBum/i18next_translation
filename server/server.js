const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')
const fs = require('fs')
const dotenv = require('dotenv')
const debug = require('debug')

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') })

// Import routes
const EventsRoutes = require('./routes/EventsRoutes')

// Create a writable stream to a log file
const logStream = fs.createWriteStream('pool.log', { flags: 'a' })

// Create a PostgreSQL connection pool
const pool = new Pool({
	user: 'postgres',
	// host: 'postgres_jms', // Docker service name
	host: '172.23.0.3', // Use the IP address of the PostgreSQL container
	database: 'eventDB',
	password: process.env.POSTGRES_SUPERUSER_PASSWORD,
	port: 5432,
})

// Log connection status to the console and the log file
pool.connect((err, client, release) => {
	if (err) {
		console.error('\x1b[31mError connecting to PostgreSQL database:', err)
		logStream.write(`Error connecting to PostgreSQL database: ${err}\n`)
	} else {
		console.log('\x1b[32mConnected to PostgreSQL database')
		logStream.write('Connected to PostgreSQL database\n')
		release()
	}
})

// Create Express Server
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to MongoDB
mongoose
	.connect('mongodb://localhost:27017/eventDB', {
		writeConcern: {
			w: 'majority',
			j: true,
			wtimeout: 1000,
		},
	})
	.then(() => {
		console.log('\x1b[32mMongoDB connected\x1b[0m')
	})
	.catch((error) => {
		console.error('\x1b[31mError:', error.message, '\x1b[0m')
		process.exit(1)
	})

// Middleware to add pool to each request
app.use((req, res, next) => {
	// Log the details of the incoming request
	console.log(`Incoming ${req.method} request to ${req.url}`)
	// @ts-ignore
	req.dbPool = pool
	next()
})

// Routes
app.use('/api/events', EventsRoutes)

// Log server start
app.listen(PORT, () => {
	console.log('\x1b[36mServer is running on port\x1b[0m', PORT)
})

// Enable debug logging for your application
debug.enable('*')
