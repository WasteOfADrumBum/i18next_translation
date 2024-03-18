const mongoose = require('mongoose')

const vehiclesModelSchema = new mongoose.Schema({
	parent: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventsModel' },
		name: { type: String, required: true },
	},
	make: { type: String, required: true },
	model: { type: String, required: true },
	year: { type: Number, required: true },
	color: { type: String, required: true },
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EntitiesModel',
		required: true,
	},
	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EntitiesModel',
		required: true,
	},
	passengers: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'EntitiesModel',
		required: true,
	},
	registration: {
		plateNumber: { type: String, required: true },
		expirationDate: { type: Date, required: true },
		state: { type: String, required: true },
	},
	insurance: {
		policyNumber: { type: String },
		provider: { type: String },
		expirationDate: { type: Date },
		insured: { type: Boolean, default: false },
	},
	stolen: { type: Boolean, default: false },
	illegalModifications: {
		wasModified: { type: Boolean, default: false },
		description: { type: String },
	},
})

const VehiclesModel = mongoose.model('VehiclesModel', vehiclesModelSchema)
console.log('\x1b[36mMongoDB:\x1b[0m Model \x1b[32mVehicles\x1b[0m')

module.exports = VehiclesModel
