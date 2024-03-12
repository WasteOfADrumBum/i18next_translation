const express = require('express')
const router = express.Router()
const { getAllEventsFromPostgres } = require('../controllers/eventController')

// GET all events from PostgreSQL
router.get('/events', async (req, res) => {
	try {
		const events = await getAllEventsFromPostgres(req.dbPool)
		res.json(events)
	} catch (error) {
		console.error('\x1b[31mError fetching events from PostgreSQL:\x1b[0m', error)
		res.status(500).json({ error: 'Internal server error' })
	}
})

module.exports = router
