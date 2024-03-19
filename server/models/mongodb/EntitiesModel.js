const mongoose = require('mongoose')

// MongoDB Schema
const entitiesModelSchema = new mongoose.Schema({
	parent: {
		_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EventsModel' },
		name: { type: String, required: false },
	},
	type: { type: String, required: true },
	person: {
		name: {
			first: { type: String, required: false },
			middle: { type: String, required: false },
			last: { type: String, required: false },
			suffix: { type: String, required: false },
		},
		dob: { type: Date, required: false },
		age: { type: String, required: false },
		nativeLanguage: { type: String, required: false },
		identification: {
			ssn: { type: String, required: false },
			passportNumber: { type: String, required: false },
			driverLicenseNumber: { type: String, required: false },
			nationalIdNumber: { type: String, required: false },
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
		contactName: { type: String, required: false },
		legal: {
			legalName: { type: String, required: false },
			legalEntityType: { type: String, required: false },
			legalStatus: { type: String, required: false },
			incorporationDate: { type: Date, required: false },
			businessRegistrationNumber: { type: String, required: false },
		},
	},
	contact: {
		phone: { type: String, required: false },
		email: { type: String, required: false },
		socialMedia: { type: String, required: false },
	},
	address: {
		address: { type: String, required: false },
		city: { type: String, required: false },
		state: { type: String, required: false },
		zip: { type: Number, required: false },
		county: { type: String, required: false },
		country: { type: String, required: false },
	},
})

// Export both Mongoose model and Sequelize model
const EntitiesModel = mongoose.model('EntitiesModel', entitiesModelSchema)
console.log('\x1b[36mMongoDB:\x1b[0m Model \x1b[32mEntities\x1b[0m')

module.exports = EntitiesModel
