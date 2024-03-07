import express from 'express'
import mongoose from 'mongoose'

const app = express()

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
// Add your routes and middleware here...

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
