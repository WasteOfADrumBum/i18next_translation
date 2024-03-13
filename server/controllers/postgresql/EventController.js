// Import required dependencies
const {
	getAllEventsFromPostgres,
	createEventInPostgres,
	updateEventInPostgres,
	deleteEventFromPostgres,
} = require('../../models/postgresql/EventsModel')

// Function to fetch all events from PostgreSQL
const getAllEventsFromPostgresController = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events from PostgreSQL (Controller)\x1b[0m')
		const eventsFromPostgres = await getAllEventsFromPostgres()
		console.log('\x1b[32mEvents fetched from PostgreSQL: (Controller)\x1b[0m', eventsFromPostgres)
		res.json(eventsFromPostgres)
	} catch (err) {
		console.error('\x1b[31mError fetching all events from PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to create a new event in PostgreSQL
const createEventInPostgresController = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new event in PostgreSQL (Controller)\x1b[0m')
		const { title, description, tagging, methodOfReceipt } = req.body
		const newEvent = await createEventInPostgres(title, description, tagging, methodOfReceipt)
		console.log('\x1b[32mEvent created in PostgreSQL: (Controller)\x1b[0m', newEvent)
		res.json(newEvent)
	} catch (err) {
		console.error('\x1b[31mError creating new event in PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to update an event in PostgreSQL
const updateEventInPostgresController = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating event in PostgreSQL (Controller)\x1b[0m')
		const { title, description, tagging, methodOfReceipt } = req.body
		const updatedEvent = await updateEventInPostgres(req.params.id, title, description, tagging, methodOfReceipt)
		console.log('\x1b[32mEvent updated in PostgreSQL: (Controller)\x1b[0m', updatedEvent)
		res.json(updatedEvent)
	} catch (err) {
		console.error('\x1b[31mError updating event in PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to delete an event from PostgreSQL
const deleteEventFromPostgresController = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting event from PostgreSQL (Controller)\x1b[0m')
		const deletedEvent = await deleteEventFromPostgres(req.params.id)
		console.log('\x1b[32mEvent deleted from PostgreSQL: (Controller)\x1b[0m', deletedEvent)
		res.json(deletedEvent)
	} catch (err) {
		console.error('\x1b[31mError deleting event from PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

module.exports = {
	getAllEventsFromPostgresController,
	createEventInPostgresController,
	updateEventInPostgresController,
	deleteEventFromPostgresController,
}
