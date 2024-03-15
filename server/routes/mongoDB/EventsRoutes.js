const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/mongodb/EventController')

// @Route   GET api/events/
// @Desc    Read All Events
// @Action  getEvents()
// @Access  Private
router.get('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Events\x1b[0m')
	eventController.getAllEvents(req, res)
})

// @Route   GET api/events/:id
// @Desc    Read Event by ID
// @Action  getEventById()
// @Access  Private
router.get('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Event\x1b[0m')
	eventController.getEventById(req, res)
})

// @Route   POST api/events/
// @Desc    Create Event
// @Action  createEvent()
// @Access  Private
router.post('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPost Event\x1b[0m')
	eventController.createEvent(req, res)
})

// @Route   PUT api/events/:id
// @Desc    Update Event
// @Action  updateEvent()
// @Access  Private
router.put('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPut Event\x1b[0m')
	eventController.updateEvent(req, res)
})

// @Route   DELETE api/events/:id
// @Desc    Delete Event
// @Action  deleteEvent()
// @Access  Private
router.delete('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mDelete Event\x1b[0m')
	eventController.deleteEvent(req, res)
})

module.exports = router
