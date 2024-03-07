import mongoose, { Schema, Document } from 'mongoose'

export interface Event extends Document {
	eventType: string
	eventSubType: string
	reporter: string
	lastUpdatedBy: string
	status: string
	eventDate: string
	recordedDate: string
	location: string
}

const eventSchema: Schema = new Schema({
	eventType: { type: String, required: true },
	eventSubType: { type: String, required: true },
	reporter: { type: String, required: true },
	lastUpdatedBy: { type: String, required: true },
	status: { type: String, required: true },
	eventDate: { type: String, required: true },
	recordedDate: { type: String, required: true },
	location: { type: String, required: true },
})

const Event = mongoose.model<Event>('Event', eventSchema)

export default Event
