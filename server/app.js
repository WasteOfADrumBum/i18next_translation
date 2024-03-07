import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import EventsRoutes from './routes/EventsRoutes'

const app = express()

// Enable CORS
app.use(cors())

// MongoDB connection URL
const mongoUrl = 'mongodb://admin:password@localhost:27017/mydatabase?retryWrites=true&w=majority'

// Connect to MongoDB
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error)
	})

// Define routes and middleware
app.use('/api/events', EventsRoutes) // Mount the EventsRoutes at /api/events

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
