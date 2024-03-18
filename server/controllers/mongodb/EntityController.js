const Entity = require('../../models/mongodb/EntitiesModel')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// @Route   GET api/entities
// @Desc    Read All Entities
// @Action  getAllEntities()
// @Access  Public
const getAllEntitiesFromMongo = async () => {
	try {
		return await Entity.find()
	} catch (err) {
		console.error('\x1b[31mError fetching entities from MongoDB:\x1b[0m', err)
		throw err
	}
}

// @Route   GET api/entities
// @Desc    Read All Entities
// @Action  getAllEntities()
// @Access  Public
const getAllEntities = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all entities (Controller)\x1b[0m')
		const entitiesFromMongo = await getAllEntitiesFromMongo()
		console.log('\x1b[32mEntities fetched from MongoDB: (Controller)\x1b[0m', entitiesFromMongo)
		res.json(entitiesFromMongo)
	} catch (err) {
		handleError(res, err, 'Error fetching all entities')
	}
}

// @Route   GET api/entities/:id
// @Desc    Read Entity by ID
// @Action  getEntityById()
// @Access  Public
const getEntityById = async (req, res) => {
	try {
		console.log('\x1b[32mFetching entity by ID (Controller)\x1b[0m')
		const entityFromMongo = await Entity.findById(req.params.id)
		console.log('\x1b[32mEntity fetched from MongoDB: (Controller)\x1b[0m', entityFromMongo)
		if (entityFromMongo) {
			res.json(entityFromMongo)
		} else {
			res.status(404).json({ message: 'Entity not found' })
		}
	} catch (err) {
		handleError(res, err, 'Error fetching entity by ID')
	}
}

// @Route   POST api/entities
// @Desc    Create New Entity
// @Action  createEntity()
// @Access  Private
const createEntity = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new entity (Controller)\x1b[0m')
		const entity = new Entity({ _id: new ObjectId(), ...req.body })
		const savedEntity = await entity.save()
		console.log('\x1b[32mEntity created in MongoDB: (Controller)\x1b[0m', savedEntity)
		res.json(savedEntity)
	} catch (err) {
		handleError(res, err, 'Error creating new entity')
	}
}

// @Route   PUT api/entities/:id
// @Desc    Update Entity by ID
// @Action  updateEntity()
// @Access  Private
const updateEntity = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating entity by ID (Controller)\x1b[0m')
		const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
		console.log('\x1b[32mEntity updated in MongoDB: (Controller)\x1b[0m', updatedEntity)
		res.json(updatedEntity)
	} catch (err) {
		handleError(res, err, 'Error updating entity by ID')
	}
}

// @Route   DELETE api/entities/:id
// @Desc    Delete Entity by ID
// @Action  deleteEntity()
// @Access  Private
const deleteEntity = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting entity by ID (Controller)\x1b[0m')
		const deletedEntity = await Entity.findByIdAndDelete(req.params._id)
		console.log('\x1b[32mEntity deleted from MongoDB: (Controller)\x1b[0m', deletedEntity)
		res.json(deletedEntity)
	} catch (err) {
		handleError(res, err, 'Error deleting entity by ID')
	}
}

// Function to handle errors
const handleError = (res, err, message) => {
	console.error(`\x1b[31m${message}:\x1b[0m`, err)
	res.status(500).json({ message: 'Server Error' })
}

module.exports = {
	getAllEntities,
	getEntityById,
	createEntity,
	updateEntity,
	deleteEntity,
}
