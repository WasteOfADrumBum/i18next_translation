const Event = require('../models/EventsModel')

// Get all events
const getAllEvents = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events (Controller)\x1b[0m')
		const events = await Event.find()
		console.log('\x1b[32mEvents fetched: (Controller)\x1b[0m', events)
		res.json(events)
	} catch (err) {
		console.error('\x1b[31mError fetching all events: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Get event by ID
const getEventById = async (req, res) => {
	try {
		console.log('\x1b[32mFetching event by ID (Controller)\x1b[0m')
		const event = await Event.findById(req.params.id)
		console.log('\x1b[32mEvent fetched: (Controller)\x1b[0m', event)
		res.json(event)
	} catch (err) {
		console.error('\x1b[31mError fetching event by ID: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Create new event
const createEvent = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new event (Controller)\x1b[0m')
		const event = new Event(req.body)
		const savedEvent = await event.save()
		console.log('\x1b[32mEvent created: (Controller)\x1b[0m', savedEvent)
		res.json(savedEvent)
	} catch (err) {
		console.error('\x1b[31mError creating new event: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Update event by ID
const updateEvent = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating event by ID (Controller)\x1b[0m')
		const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
		console.log('\x1b[32mEvent updated: (Controller)\x1b[0m', updatedEvent)
		res.json(updatedEvent)
	} catch (err) {
		console.error('\x1b[31mError updating event by ID: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Delete event by ID
const deleteEvent = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting event by ID (Controller)\x1b[0m')
		const deletedEvent = await Event.findByIdAndDelete(req.params.id)
		console.log('\x1b[32mEvent deleted: (Controller)\x1b[0m', deletedEvent)
		res.json(deletedEvent)
	} catch (err) {
		console.error('\x1b[31mError deleting event by ID: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

module.exports = {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
}
