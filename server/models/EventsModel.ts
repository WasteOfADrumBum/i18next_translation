import mongoose, { Schema, Document } from 'mongoose'

export interface EventsModel extends Document {
	reported: {
		reporter: string
		reportedDate: Date
	}
	updated: {
		updatedBy: string
		updatedDate: Date
	}
	submitted: {
		submittedBy: string
		submittedDate: Date
	}
	type: {
		eventType: string
		eventSubType: string
	}
	details: {
		title: string
		description: string
		tagging: string[]
		methodOfReceipt: string
	}
	location: {
		address: string
		city: string
		zip: string
		country: string
		county: string
		state: string
	}
}

const eventsModelSchema: Schema = new Schema({
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

const EventsModel = mongoose.model<EventsModel>('EventsModel', eventsModelSchema)

export default EventsModel
