import mongoose, { Document } from 'mongoose'

export interface UserDocument extends Document {
	username: string
	email: string
	// Add other fields as needed
}

const userSchema = new mongoose.Schema<UserDocument>({
	username: { type: String, required: true },
	email: { type: String, required: true },
	// Define other fields here
})

export default mongoose.model<UserDocument>('User', userSchema)
