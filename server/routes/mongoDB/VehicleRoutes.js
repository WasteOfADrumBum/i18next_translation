const express = require('express')
const router = express.Router()
const eventController = require('../../controllers/mongodb/VehicleController')

// @Route   GET api/vehicles/
// @Desc    Read All Vehicles
// @Action  getVehicles()
// @Access  Private
router.get('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Vehicles\x1b[0m')
	eventController.getAllVehicles(req, res)
})

// @Route   GET api/vehicles/:id
// @Desc    Read Vehicle by ID
// @Action  getVehicleById()
// @Access  Private
router.get('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mGet Vehicle\x1b[0m')
	eventController.getVehicleById(req, res)
})

// @Route   POST api/vehicles/
// @Desc    Create Vehicle
// @Action  createVehicle()
// @Access  Private
router.post('/', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPost Vehicle\x1b[0m')
	eventController.createVehicle(req, res)
})

// @Route   PUT api/vehicles/:id
// @Desc    Update Vehicle
// @Action  updateVehicle()
// @Access  Private
router.put('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mPut Vehicle\x1b[0m')
	eventController.updateVehicle(req, res)
})

// @Route   DELETE api/vehicles/:id
// @Desc    Delete Vehicle
// @Action  deleteVehicle()
// @Access  Private
router.delete('/:id', (req, res) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Route \x1b[32mDelete Vehicle\x1b[0m')
	eventController.deleteVehicle(req, res)
})

module.exports = router
