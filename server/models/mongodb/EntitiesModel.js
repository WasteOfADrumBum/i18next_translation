const mongoose = require('mongoose')

// MongoDB Schema
const entitiesModelSchema = new mongoose.Schema({
	parent_fk_id: { type: String, required: true },
})

// Export both Mongoose model and Sequelize model
const EntitiesModel = mongoose.model('EntitiesModel', entitiesModelSchema)
console.log('\x1b[36mMongoDB:\x1b[0m Model \x1b[32mEntities\x1b[0m')

module.exports = EntitiesModel
