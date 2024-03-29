const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	// Define other fields here
})

module.exports = mongoose.model('User', userSchema)
