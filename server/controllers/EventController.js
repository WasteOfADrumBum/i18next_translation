const Event = require('../models/EventsModel')

// Get all events
exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find()
		res.json(events)
	} catch (err) {
		res.status(500).json({ message: 'Server Error' })
	}
}

// Get event by ID
exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		res.json(event)
	} catch (err) {
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
		const newEvent = new Event({
			reported: { reporter, reportedDate },
			updated: { updatedBy, updatedDate },
			submitted: { submittedBy, submittedDate },
			type: { eventType, eventSubType },
			details: { title, description, tagging, methodOfReceipt },
			location: { address, city, zip, country, county, state },
		})
		const event = await newEvent.save()
		res.status(201).json(event)
	} catch (err) {
		res.status(500).json({ message: 'Server Error' })
	}
}

// Update an event
exports.updateEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		res.json(event)
	} catch (err) {
		res.status(500).json({ message: 'Server Error' })
	}
}

// Delete an event
exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		res.json({ message: 'Event deleted' })
	} catch (err) {
		res.status(500).json({ message: 'Server Error' })
	}
}
