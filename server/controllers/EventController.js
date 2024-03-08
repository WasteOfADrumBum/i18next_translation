const Event = require('../models/EventsModel')

// Get all events
exports.getAllEvents = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events (Controller)\x1b[0m')
		const events = await Event.find()
		console.log('\x1b[32mEvents fetched: (Controller)\x1b[0m', events)
		res.json(events)
	} catch (err) {
		console.error('\x1b[31mError fetching all events: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Get event by ID
exports.getEventById = async (req, res) => {
	try {
		console.log('\x1b[32mFetching event by ID: (Controller)\x1b[0m', req.params.id)
		const event = await Event.findById(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		console.log('\x1b[32mEvent fetched: (Controller)\x1b[0m', event)
		res.json(event)
	} catch (err) {
		console.error('\x1b[31mError fetching event by ID: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Create an event
exports.createEvent = async (req, res) => {
	const {
		reported: { reporter, reportedDate },
		updated: { updatedBy, updatedDate },
		submitted: { submittedBy, submittedDate },
		type: { eventType, eventSubType },
		details: { title, description, tagging, methodOfReceipt },
		location: { address, city, zip, country, county, state },
	} = req.body
	try {
		console.log('\x1b[32mCreating a new event (Controller)\x1b[0m')
		const newEvent = new Event({
			reported: { reporter, reportedDate },
			updated: { updatedBy, updatedDate },
			submitted: { submittedBy, submittedDate },
			type: { eventType, eventSubType },
			details: { title, description, tagging, methodOfReceipt },
			location: { address, city, zip, country, county, state },
		})
		const event = await newEvent.save()
		console.log('\x1b[32mNew event created: (Controller)\x1b[0m', event)
		res.status(201).json(event)
	} catch (err) {
		console.error('\x1b[31mError creating event: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Update an event
exports.updateEvent = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating event with ID: (Controller)\x1b[0m', req.params.id)
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		console.log('\x1b[32mEvent updated: (Controller)\x1b[0m', event)
		res.json(event)
	} catch (err) {
		console.error('\x1b[31mError updating event: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Delete an event
exports.deleteEvent = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting event with ID: (Controller)\x1b[0m', req.params.id)
		const event = await Event.findByIdAndDelete(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		console.log('\x1b[32mEvent deleted (Controller)\x1b[0m')
		res.json({ message: 'Event deleted' })
	} catch (err) {
		console.error('\x1b[31mError deleting event: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}
