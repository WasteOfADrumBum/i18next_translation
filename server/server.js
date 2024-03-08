const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const EventsRoutes = require('./routes/EventsRoutes.js')
const app = express()
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

// Console log with a divider
function logWithDivider(message) {
	console.log('\x1b[36m' + message + '\x1b[0m')
	console.log('\x1b[34m---------------------------------------\x1b[0m')
}

// console the dirname
logWithDivider('dirname: ' + __dirname)

// Log the environment variables used
logWithDivider('Environment variables:')
console.log('\x1b[33mCLIENT_ORIGIN:\x1b[0m', process.env.CLIENT_ORIGIN)
console.log('\x1b[33mCLIENT_API_BASE_URL:\x1b[0m', process.env.CLIENT_API_BASE_URL)
console.log('\x1b[33mNODE_DOCKER_PORT:\x1b[0m', process.env.NODE_DOCKER_PORT)

var corsOptions = {
	origin: process.env.CLIENT_ORIGIN || 'http://localhost:8081',
}

// Enable CORS
app.use(cors(corsOptions))

// Proxy middleware to forward requests to the API
logWithDivider('Setting up proxy middleware...')
app.use(
	'/api',
	createProxyMiddleware({
		target: process.env.CLIENT_API_BASE_URL,
		changeOrigin: true,
	}),
)
console.log('\x1b[32mProxy middleware configured for target:\x1b[0m', process.env.CLIENT_API_BASE_URL)

// Define routes and middleware
logWithDivider('Setting up routes and middleware...')
app.use('/api/events', EventsRoutes)

// Start the server
const PORT = process.env.NODE_DOCKER_PORT || 8080
app.listen(PORT, () => {
	console.log('\x1b[35mServer is running on port\x1b[0m', PORT)
})
console.log('\x1b[35mServer started.\x1b[0m')
