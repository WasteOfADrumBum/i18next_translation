const express = require('express')
const EventsModel = require('../models/EventsModel')

const router = express.Router()

// GET all events
router.get('/', async (req, res) => {
	console.log('\x1b[32mReceived GET request:\x1b[0m', req.url)
	try {
		const events = await EventsModel.find()
		console.log('\x1b[32mEvents fetched:\x1b[0m', events)
		res.json(events)
	} catch (err) {
		console.error('\x1b[31mError fetching events:\x1b[0m', err)
		res.status(500).json({ message: err.message })
	}
})

// GET a single event by ID
router.get('/:id', getEvent, (req, res) => {
	console.log('\x1b[32mReceived GET request:\x1b[0m', req.url)
	res.json(res.locals.event)
})

// CREATE a new event
router.post('/', async (req, res) => {
	console.log('\x1b[32mReceived POST request:\x1b[0m', req.body)
	const eventData = req.body
	try {
		const newEvent = await EventsModel.create(eventData)
		console.log('\x1b[32mNew event created:\x1b[0m', newEvent)
		res.status(201).json(newEvent)
	} catch (err) {
		console.error('\x1b[31mError creating event:\x1b[0m', err)
		res.status(400).json({ message: err.message })
	}
})

// UPDATE an event
router.patch('/:id', getEvent, async (req, res) => {
	console.log('\x1b[32mReceived PATCH request:\x1b[0m', req.body)
	try {
		Object.assign(res.locals.event, req.body)
		const updatedEvent = await res.locals.event.save()
		console.log('\x1b[32mEvent updated:\x1b[0m', updatedEvent)
		res.json(updatedEvent)
	} catch (err) {
		console.error('\x1b[31mError updating event:\x1b[0m', err)
		res.status(400).json({ message: err.message })
	}
})

// DELETE an event
router.delete('/:id', getEvent, async (req, res) => {
	console.log('\x1b[32mReceived DELETE request:\x1b[0m', req.url)
	try {
		await res.locals.event.remove()
		console.log('\x1b[32mEvent deleted:\x1b[0m', res.locals.event)
		res.json({ message: 'Event deleted' })
	} catch (err) {
		console.error('\x1b[31mError deleting event:\x1b[0m', err)
		res.status(500).json({ message: err.message })
	}
})

// Middleware to fetch event by ID
async function getEvent(req, res, next) {
	console.log('\x1b[32mFetching event by ID:\x1b[0m', req.params.id)
	try {
		const event = await EventsModel.findById(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		console.log('\x1b[32mEvent fetched:\x1b[0m', event)
		res.locals.event = event
		next()
	} catch (err) {
		console.error('\x1b[31mError fetching event:\x1b[0m', err)
		return res.status(500).json({ message: err.message })
	}
}

module.exports = router
