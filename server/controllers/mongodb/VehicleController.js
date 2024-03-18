const Vehicle = require('../../models/mongodb/VehiclesModel')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// @Route   GET api/vehicles
// @Desc    Read All Vehicles
// @Action  getAllVehicles()
// @Access  Public
const getAllVehiclesFromMongo = async () => {
	try {
		return await Vehicle.find()
	} catch (err) {
		console.error('\x1b[31mError fetching vehicles from MongoDB:\x1b[0m', err)
		throw err
	}
}

// @Route   GET api/vehicles
// @Desc    Read All Vehicles
// @Action  getAllVehicles()
// @Access  Public
const getAllVehicles = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all vehicles (Controller)\x1b[0m')
		const vehiclesFromMongo = await getAllVehiclesFromMongo()
		console.log('\x1b[32mVehicles fetched from MongoDB: (Controller)\x1b[0m', vehiclesFromMongo)
		res.json(vehiclesFromMongo)
	} catch (err) {
		handleError(res, err, 'Error fetching all vehicles')
	}
}

// @Route   GET api/vehicles/:id
// @Desc    Read Vehicle by ID
// @Action  getVehicleById()
// @Access  Public
const getVehicleById = async (req, res) => {
	try {
		console.log('\x1b[32mFetching vehicle by ID (Controller)\x1b[0m')
		const vehicleFromMongo = await Vehicle.findById(req.params.id)
		console.log('\x1b[32mVehicle fetched from MongoDB: (Controller)\x1b[0m', vehicleFromMongo)
		if (vehicleFromMongo) {
			res.json(vehicleFromMongo)
		} else {
			res.status(404).json({ message: 'Vehicle not found' })
		}
	} catch (err) {
		handleError(res, err, 'Error fetching vehicle by ID')
	}
}

// @Route   POST api/vehicles
// @Desc    Create New Vehicle
// @Action  createVehicle()
// @Access  Private
const createVehicle = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new vehicle (Controller)\x1b[0m')
		const vehicle = new Vehicle({ _id: new ObjectId(), ...req.body })
		const savedVehicle = await vehicle.save()
		console.log('\x1b[32mVehicle created in MongoDB: (Controller)\x1b[0m', savedVehicle)
		res.json(savedVehicle)
	} catch (err) {
		handleError(res, err, 'Error creating new vehicle')
	}
}

// @Route   PUT api/vehicles/:id
// @Desc    Update Vehicle by ID
// @Action  updateVehicle()
// @Access  Private
const updateVehicle = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating vehicle by ID (Controller)\x1b[0m')
		const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
		console.log('\x1b[32mVehicle updated in MongoDB: (Controller)\x1b[0m', updatedVehicle)
		res.json(updatedVehicle)
	} catch (err) {
		handleError(res, err, 'Error updating vehicle by ID')
	}
}

// @Route   DELETE api/vehicles/:id
// @Desc    Delete Vehicle by ID
// @Action  deleteVehicle()
// @Access  Private
const deleteVehicle = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting vehicle by ID (Controller)\x1b[0m')
		const deletedVehicle = await Vehicle.findByIdAndDelete(req.params._id)
		console.log('\x1b[32mVehicle deleted from MongoDB: (Controller)\x1b[0m', deletedVehicle)
		res.json(deletedVehicle)
	} catch (err) {
		handleError(res, err, 'Error deleting vehicle by ID')
	}
}

// Function to handle errors
const handleError = (res, err, message) => {
	console.error(`\x1b[31m${message}:\x1b[0m`, err)
	res.status(500).json({ message: 'Server Error' })
}

module.exports = {
	getAllVehicles,
	getVehicleById,
	createVehicle,
	updateVehicle,
	deleteVehicle,
}
