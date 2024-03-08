const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const EventsRoutes = require('./routes/EventsRoutes.js')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware')

require('dotenv').config({ path: path.join(__dirname, '../.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Proxy middleware to forward requests to the API
app.use(
	'/api',
	createProxyMiddleware({
		target: 'http://localhost:5000', // Forward requests to your server
		changeOrigin: true,
		logLevel: 'debug', // Log level set to debug
		onError: (err, req, res) => {
			console.error('\x1b[31mProxy Error:\x1b[0m', err)
			res.writeHead(500, {
				'Content-Type': 'text/plain',
			})
			res.end('Something went wrong. And we are reporting a custom error message.')
		},
		onProxyReq: (proxyReq, req, res) => {
			console.log('\x1b[32mProxy Request:\x1b[0m', req.method, req.url)
		},
		onProxyRes: (proxyRes, req, res) => {
			console.log('\x1b[32mProxy Response:\x1b[0m', req.method, req.url, 'Status:', proxyRes.statusCode)
		},
		onOpen: (proxySocket) => {
			console.log('\x1b[32mProxy Socket Opened:\x1b[0m', proxySocket)
		},
	}),
)

// Connect to MongoDB
mongoose
	.connect('mongodb://localhost:27017/eventsDB')
	.then(() => console.log('\x1b[32mMongoDB connected\x1b[0m')) // Green
	.catch((err) => console.error('\x1b[31mMongoDB connection error:\x1b[0m', err)) // Red

// Log API requests
app.use('/api/events', (req, res, next) => {
	console.log(
		`\x1b[35m[${new Date().toLocaleString()}]\x1b[0m \x1b[33m${req.method}\x1b[0m request to \x1b[34m${
			req.path
		}\x1b[0m`,
	)
	console.log('Inside API request logging middleware')
	next()
})

// Routes
app.use('/api/events', EventsRoutes)

// Log server start
app.listen(PORT, () => {
	console.log('\x1b[36mServer is running on port\x1b[0m', PORT) // Cyan
})
