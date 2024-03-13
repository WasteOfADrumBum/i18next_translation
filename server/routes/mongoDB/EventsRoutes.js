const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/mongodb/EventController')

// GET all events
router.get('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Events\x1b[0m')
	eventController.getAllEvents(req, res)
})

// GET event by ID
router.get('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Event\x1b[0m')
	eventController.getEventById(req, res)
})

// POST new event
router.post('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPost Event\x1b[0m')
	eventController.createEvent(req, res)
})

// PUT update event by ID
router.put('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPut Event\x1b[0m')
	eventController.updateEvent(req, res)
})

// DELETE event by ID
router.delete('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mDelete Event\x1b[0m')
	eventController.deleteEvent(req, res)
})

module.exports = router
