const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const { Pool } = require('pg')
const { exec } = require('child_process')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Import routes
const EventsRoutes = require('./routes/EventsRoutes')

// Import PostgreSQL configuration
const pool = require('./postgresConfig')

// Create Express Server
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to MongoDB
;(async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/eventDB', {
			writeConcern: {
				w: 'majority',
				j: true,
				wtimeout: 1000,
			},
		})
		console.log('\x1b[32mMongoDB connected\x1b[0m')
	} catch (error) {
		console.error('\x1b[31mError:', error.message, '\x1b[0m')
		process.exit(1)
	}
})()

// Middleware to add pool to each request
app.use((req, res, next) => {
	// Log the details of the incoming request
	console.log(`Incoming ${req.method} request to ${req.url}`)
	// @ts-ignore
	req.dbPool = pool
	// Move to the next middleware in the stack
	next()
})

// Test PostgreSQL connection
function testPostgreSQLConnection() {
	const username = 'postgres' // Change as per your PostgreSQL configuration
	const database = 'eventDB' // Change as per your PostgreSQL configuration

	// Construct the psql command
	const command = `psql -h postgres -U ${username} -d ${database} -c 'SELECT version()'`

	// Execute the psql command
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error connecting to PostgreSQL: ${error.message}`)
			return
		}
		if (stderr) {
			console.error(`Error connecting to PostgreSQL: ${stderr}`)
			return
		}
		console.log(`Successfully connected to PostgreSQL: ${stdout}`)
	})
}

// Call the function to test PostgreSQL connection
testPostgreSQLConnection()

// Routes
app.use('/api/events', EventsRoutes)

// Log server start
app.listen(PORT, () => {
	console.log('\x1b[36mServer is running on port\x1b[0m', PORT)
})

// Import the debug library
const debug = require('debug')

// Enable debug logging for your application
debug.enable('*')
