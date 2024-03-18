const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/mongodb/EntityController')

// @Route   GET api/entities/
// @Desc    Read All Entities
// @Action  getEntities()
// @Access  Private
router.get('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Entities\x1b[0m')
	eventController.getAllEntities(req, res)
})

// @Route   GET api/entities/:id
// @Desc    Read Entity by ID
// @Action  getEntityById()
// @Access  Private
router.get('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Entity\x1b[0m')
	eventController.getEntityById(req, res)
})

// @Route   POST api/entities/
// @Desc    Create Entity
// @Action  createEntity()
// @Access  Private
router.post('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPost Entity\x1b[0m')
	eventController.createEntity(req, res)
})

// @Route   PUT api/entities/:id
// @Desc    Update Entity
// @Action  updateEntity()
// @Access  Private
router.put('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPut Entity\x1b[0m')
	eventController.updateEntity(req, res)
})

// @Route   DELETE api/entities/:id
// @Desc    Delete Entity
// @Action  deleteEntity()
// @Access  Private
router.delete('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mDelete Entity\x1b[0m')
	eventController.deleteEntity(req, res)
})

module.exports = router
