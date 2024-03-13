// Import the required modules
const EventsModel = require('../../models/postgresql/EventsModel')

// Middleware function for logging
const logRoute = (req, res, next) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32m' + req.method + ' ' + req.originalUrl + '\x1b[0m')
	next()
}

// Function to get all events
const getUsers = async (req, res) => {
	try {
		logRoute(req, res)
		const events = await EventsModel.getAllEvents(req, res)
		res.json(events)
	} catch (error) {
		console.error('Error getting all events:', error)
		res.status(500).json({ error: 'Error getting all events' })
	}
}

// Function to get an event by ID
const getUserById = async (req, res) => {
	const eventId = req.params.id
	try {
		logRoute(req, res)
		const event = await EventsModel.getEventById(req, res, eventId)
		if (!event) {
			return res.status(404).json({ error: 'Event not found' })
		}
		res.json(event)
	} catch (error) {
		console.error('Error getting event by ID:', error)
		res.status(500).json({ error: 'Error getting event by ID' })
	}
}

// Function to create a new event
const createUser = async (req, res) => {
	try {
		logRoute(req, res)
		const newEvent = await EventsModel.createEvent(req, res)
		res.status(201).json(newEvent)
	} catch (error) {
		console.error('Error creating event:', error)
		res.status(500).json({ error: 'Error creating event' })
	}
}

// Function to update an event
const updateUser = async (req, res) => {
	const eventId = req.params.id
	try {
		logRoute(req, res)
		const updatedEvent = await EventsModel.updateEvent(req, res, eventId)
		if (!updatedEvent) {
			return res.status(404).json({ error: 'Event not found' })
		}
		res.json(updatedEvent)
	} catch (error) {
		console.error('Error updating event:', error)
		res.status(500).json({ error: 'Error updating event' })
	}
}

// Function to delete an event
const deleteUser = async (req, res) => {
	const eventId = req.params.id
	try {
		logRoute(req, res)
		const deletedEvent = await EventsModel.deleteEvent(req, res, eventId)
		if (!deletedEvent) {
			return res.status(404).json({ error: 'Event not found' })
		}
		res.json(deletedEvent)
	} catch (error) {
		console.error('Error deleting event:', error)
		res.status(500).json({ error: 'Error deleting event' })
	}
}

// Export the controller functions
module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}
