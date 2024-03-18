const mongoose = require('mongoose')

// MongoDB Schema
const vehiclesModelSchema = new mongoose.Schema({
	parent: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventsModel' },
		name: { type: String, required: true },
	},
})

// Export both Mongoose model and Sequelize model
const VehiclesModel = mongoose.model('VehiclesModel', vehiclesModelSchema)
console.log('\x1b[36mMongoDB:\x1b[0m Model \x1b[32mVehicles\x1b[0m')

module.exports = VehiclesModel
