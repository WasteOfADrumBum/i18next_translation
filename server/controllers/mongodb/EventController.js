const Event = require('../../models/mongodb/EventsModel')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// @Route   GET api/events
// @Desc    Read All Events
// @Action  getAllEvents()
// @Access  Public
const getAllEventsFromMongo = async () => {
	try {
		return await Event.find()
	} catch (err) {
		console.error('\x1b[31mError fetching events from MongoDB:\x1b[0m', err)
		throw err
	}
}

// @Route   GET api/events
// @Desc    Read All Events
// @Action  getAllEvents()
// @Access  Public
const getAllEvents = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events (Controller)\x1b[0m')
		const eventsFromMongo = await getAllEventsFromMongo()
		console.log('\x1b[32mEvents fetched from MongoDB: (Controller)\x1b[0m', eventsFromMongo)
		res.json(eventsFromMongo)
	} catch (err) {
		handleError(res, err, 'Error fetching all events')
	}
}

// @Route   GET api/events/:id
// @Desc    Read Event by ID
// @Action  getEventById()
// @Access  Public
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
		handleError(res, err, 'Error fetching event by ID')
	}
}

// @Route   POST api/events
// @Desc    Create New Event
// @Action  createEvent()
// @Access  Private
const createEvent = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new event (Controller)\x1b[0m')
		const event = new Event({ _id: new ObjectId(), ...req.body }) // Use new ObjectId()
		const savedEvent = await event.save()
		console.log('\x1b[32mEvent created in MongoDB: (Controller)\x1b[0m', savedEvent)
		res.json(savedEvent)
	} catch (err) {
		handleError(res, err, 'Error creating new event')
	}
}

// @Route   PUT api/events/:id
// @Desc    Update Event by ID
// @Action  updateEvent()
// @Access  Private
const updateEvent = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating event by ID (Controller)\x1b[0m')
		const updatedEvent = await Event.findByIdAndUpdate(req.params._id, req.body, { new: true }) // Use req.params._id
		console.log('\x1b[32mEvent updated in MongoDB: (Controller)\x1b[0m', updatedEvent)
		res.json(updatedEvent)
	} catch (err) {
		handleError(res, err, 'Error updating event by ID')
	}
}

// @Route   DELETE api/events/:id
// @Desc    Delete Event by ID
// @Action  deleteEvent()
// @Access  Private
const deleteEvent = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting event by ID (Controller)\x1b[0m')
		const deletedEvent = await Event.findByIdAndDelete(req.params._id) // Use req.params._id
		console.log('\x1b[32mEvent deleted from MongoDB: (Controller)\x1b[0m', deletedEvent)
		res.json(deletedEvent)
	} catch (err) {
		handleError(res, err, 'Error deleting event by ID')
	}
}

// Function to handle errors
const handleError = (res, err, message) => {
	console.error(`\x1b[31m${message}:\x1b[0m`, err)
	res.status(500).json({ message: 'Server Error' })
}

module.exports = {
	getAllEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
}
