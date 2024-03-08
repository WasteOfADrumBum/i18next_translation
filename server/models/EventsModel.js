const mongoose = require('mongoose')

const { Schema } = mongoose

const eventsModelSchema = new Schema({
	reported: {
		reporter: { type: String, required: true },
		reportedDate: { type: Date, default: Date.now },
	},
	updated: {
		updatedBy: { type: String, required: true },
		updatedDate: { type: Date, default: Date.now },
	},
	submitted: {
		submittedBy: { type: String, required: true },
		submittedDate: { type: Date, default: Date.now },
	},
	type: {
		eventType: { type: String, required: true },
		eventSubType: { type: String, required: true },
	},
	details: {
		title: { type: String, required: true },
		description: { type: String, required: true },
		tagging: { type: [String], default: [] },
		methodOfReceipt: { type: String, required: true },
	},
	location: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		zip: { type: String, required: true },
		country: { type: String, required: true },
		county: { type: String, required: true },
		state: { type: String, required: true },
	},
})

const EventsModel = mongoose.model('EventsModel', eventsModelSchema)

console.log('Model: EventsModel')

module.exports = EventsModel
