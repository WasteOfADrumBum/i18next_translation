const express = require('express')
const EventsModel = require('../models/EventsModel')

const router = express.Router()

// GET all events
router.get('/', async (req, res) => {
	try {
		const events = await EventsModel.find()
		res.json(events)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// GET a single event by ID
router.get('/:id', getEvent, (req, res) => {
	res.json(res.locals.event)
})

// CREATE a new event
router.post('/', async (req, res) => {
	console.log('Received POST request:', req.body) // Log the request body
	const eventData = req.body
	try {
		const newEvent = await EventsModel.create(eventData)
		console.log('New event created:', newEvent) // Log the newly created event
		res.status(201).json(newEvent)
	} catch (err) {
		console.error('Error creating event:', err)
		res.status(400).json({ message: err.message })
	}
})

// UPDATE an event
router.patch('/:id', getEvent, async (req, res) => {
	try {
		Object.assign(res.locals.event, req.body)
		const updatedEvent = await res.locals.event.save()
		res.json(updatedEvent)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

// DELETE an event
router.delete('/:id', getEvent, async (req, res) => {
	try {
		await res.locals.event.remove()
		res.json({ message: 'Event deleted' })
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

// Middleware to fetch event by ID
async function getEvent(req, res, next) {
	try {
		const event = await EventsModel.findById(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		res.locals.event = event
		next()
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
}

module.exports = router
