const express = require('express')
const cors = require('cors')
const EventsRoutes = require('./routes/EventsRoutes.js')
const app = express()

require('dotenv').config()

var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || 'http://localhost:8081',
}

// Enable CORS
app.use(cors(corsOptions))

// Define routes and middleware
app.use('/api/events', EventsRoutes)

// Start the server
const PORT = process.env.NODE_DOCKER_PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
