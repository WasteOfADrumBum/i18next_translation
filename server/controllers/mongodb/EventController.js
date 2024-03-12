const Event = require('../../models/mongodb/EventsModel')

// Get all events from MongoDB
const getAllEventsFromMongo = async () => {
	try {
		return await Event.find()
	} catch (err) {
		console.error('\x1b[31mError fetching events from MongoDB:\x1b[0m', err)
		throw err
	}
}

// Get all events
const getAllEvents = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events (Controller)\x1b[0m')
		const eventsFromMongo = await getAllEventsFromMongo()
		console.log('\x1b[32mEvents fetched from MongoDB: (Controller)\x1b[0m', eventsFromMongo)
		res.json(eventsFromMongo)
	} catch (err) {
		console.error('\x1b[31mError fetching all events: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Get event by ID
const getEventById = async (req, res) => {
	try {
		console.log('\x1b[32mFetching event by ID (Controller)\x1b[0m')
		const eventFromMongo = await Event.findById(req.params.id)
		console.log('\x1b[32mEvent fetched from MongoDB: (Controller)\x1b[0m', eventFromMongo)
		if (eventFromMongo) {
			res.json(eventFromMongo)
		} else {
			res.status(404).json({ message: 'Event not found' })
		}
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
		console.log('\x1b[32mEvent created in MongoDB: (Controller)\x1b[0m', savedEvent)
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
		console.log('\x1b[32mEvent updated in MongoDB: (Controller)\x1b[0m', updatedEvent)
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
		console.log('\x1b[32mEvent deleted from MongoDB: (Controller)\x1b[0m', deletedEvent)
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
