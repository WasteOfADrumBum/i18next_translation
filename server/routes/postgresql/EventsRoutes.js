const express = require('express')
const router = express.Router()
const {
	getAllEventsFromPostgresController,
	createEventInPostgresController,
	updateEventInPostgresController,
	deleteEventFromPostgresController,
} = require('../../controllers/postgresql/EventController')

// GET all events from PostgreSQL
router.get('/events', async (req, res) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32mGet Events\x1b[0m')
	try {
		const events = await getAllEventsFromPostgresController(req, res)
		res.json(events)
	} catch (error) {
		console.error('\x1b[31mError fetching events from PostgreSQL:\x1b[0m', error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

// POST new event to PostgreSQL
router.post('/events', async (req, res) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32mPost Event\x1b[0m')
	try {
		const event = await createEventInPostgresController(req, res)
		res.json(event)
	} catch (error) {
		console.error('\x1b[31mError creating event in PostgreSQL:\x1b[0m', error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

// PUT update event in PostgreSQL by ID
router.put('/events/:id', async (req, res) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32mUpdate Event\x1b[0m')
	try {
		const event = await updateEventInPostgresController(req, res)
		res.json(event)
	} catch (error) {
		console.error('\x1b[31mError updating event in PostgreSQL:\x1b[0m', error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

// DELETE event from PostgreSQL by ID
router.delete('/events/:id', async (req, res) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32mDelete Event\x1b[0m')
	try {
		const event = await deleteEventFromPostgresController(req, res)
		res.json(event)
	} catch (error) {
		console.error('\x1b[31mError deleting event from PostgreSQL:\x1b[0m', error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

module.exports = router
