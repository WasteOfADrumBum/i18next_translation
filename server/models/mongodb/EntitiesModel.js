const mongoose = require('mongoose')

// MongoDB Schema
const entitiesModelSchema = new mongoose.Schema({
	parent: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventsModel' },
		name: { type: String, required: true },
	},
	type: { type: String, required: true },
	person: {
		name: {
			first: { type: String, required: true },
			middle: { type: String, required: false },
			last: { type: String, required: true },
			suffix: { type: String, required: false },
		},
		dob: { type: Date, required: true },
		age: { type: String, required: false },
		nativeLanguage: { type: String, required: false },
		identification: {
			ssn: { type: String, required: false },
			passportNumber: { type: String, required: false },
			driverLicenseNumber: { type: String, required: false },
			nationalIdNumber: { type: String, required: false },
			taxIdNumber: { type: String, required: false },
			visaType: { type: String, required: false },
			visaExpiryDate: { type: Date, required: false },
			isLegalResident: { type: Boolean, required: false },
			illegalStatusDescription: { type: String, required: false },
		},
		employment: {
			jobTitle: { type: String, required: false },
			department: { type: String, required: false },
			employeeId: { type: String, required: false },
			hireDate: { type: Date, required: false },
			employmentStatus: { type: String, required: false },
		},
	},
	organization: {
		contactName: { type: String, required: true },
		legal: {
			legalName: { type: String, required: true },
			legalEntityType: { type: String, required: false },
			legalStatus: { type: String, required: false },
			incorporationDate: { type: Date, required: false },
			businessRegistrationNumber: { type: String, required: false },
		},
	},
	contact: {
		name: { type: String, required: true },
		phone: { type: String, required: true },
		email: { type: String, required: true },
		socialMedia: { type: String, required: false },
	},
	address: {
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zip: { type: Number, required: true },
		county: { type: String, required: false },
		country: { type: String, required: true },
	},
})

// Export both Mongoose model and Sequelize model
const EntitiesModel = mongoose.model('EntitiesModel', entitiesModelSchema)
console.log('\x1b[36mMongoDB:\x1b[0m Model \x1b[32mEntities\x1b[0m')

module.exports = EntitiesModel
