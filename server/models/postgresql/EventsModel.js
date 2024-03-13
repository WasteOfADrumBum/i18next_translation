// Import the required modules
const { pool } = require('../../../server')

// Middleware function for logging
const logRoute = (req, res, next) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32m' + req.method + ' ' + req.originalUrl + '\x1b[0m')
	next()
}

// Define the model functions

// Function to get all events
const getAllEvents = async (req, res) => {
	try {
		logRoute(req, res)
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM events')
		client.release()
		return result.rows
	} catch (error) {
		console.error('Error getting all events:', error)
		throw new Error('Error getting all events')
	}
}

// Function to get an event by ID
const getEventById = async (req, res, eventId) => {
	try {
		logRoute(req, res)
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM events WHERE id = $1', [eventId])
		client.release()
		return result.rows[0]
	} catch (error) {
		console.error('Error getting event by ID:', error)
		throw new Error('Error getting event by ID')
	}
}

// Function to create a new event
const createEvent = async (req, res) => {
	try {
		logRoute(req, res)
		const client = await pool.connect()
		const result = await client.query('INSERT INTO events DEFAULT VALUES RETURNING *')
		client.release()
		return result.rows[0]
	} catch (error) {
		console.error('Error creating event:', error)
		throw new Error('Error creating event')
	}
}

// Function to update an event
const updateEvent = async (req, res, eventId) => {
	try {
		logRoute(req, res)
		const client = await pool.connect()
		const result = await client.query('UPDATE events SET ... WHERE id = $1 RETURNING *', [eventId])
		client.release()
		return result.rows[0]
	} catch (error) {
		console.error('Error updating event:', error)
		throw new Error('Error updating event')
	}
}

// Function to delete an event
const deleteEvent = async (req, res, eventId) => {
	try {
		logRoute(req, res)
		const client = await pool.connect()
		const result = await client.query('DELETE FROM events WHERE id = $1 RETURNING *', [eventId])
		client.release()
		return result.rows[0]
	} catch (error) {
		console.error('Error deleting event:', error)
		throw new Error('Error deleting event')
	}
}

// Export the model functions
module.exports = {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
}
