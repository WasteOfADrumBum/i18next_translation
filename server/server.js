const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Import routes
const EventsRoutes = require('./routes/EventsRoutes')

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

// Routes
app.use('/api/events', EventsRoutes)

// Log server start
app.listen(PORT, () => {
	console.log('\x1b[36mServer is running on port\x1b[0m', PORT)
})
