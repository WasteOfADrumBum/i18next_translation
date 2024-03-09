const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

// GET all events
router.get('/', (req, res) => {
	eventController.getAllEvents(req, res)
})

// GET event by ID
router.get('/:id', (req, res) => {
	eventController.getEventById(req, res)
})

// POST new event
router.post('/', (req, res) => {
	eventController.createEvent(req, res)
})

// PUT update event by ID
router.put('/:id', (req, res) => {
	eventController.updateEvent(req, res)
})

// DELETE event by ID
router.delete('/:id', (req, res) => {
	eventController.deleteEvent(req, res)
})

module.exports = router
