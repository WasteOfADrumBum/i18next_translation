const express = require('express')
const router = express.Router()
const {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../../controllers/postgresql/EventController')

// Middleware function for logging
const logRoute = (req, res, next) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Route \x1b[32m' + req.method + ' ' + req.originalUrl + '\x1b[0m')
	next()
}

// GET all users
router.route('/').get(logRoute, getUsers)

// GET a single user by ID
router.route('/:id').get(logRoute, getUserById)

// POST create a new user
router.route('/').post(logRoute, createUser)

// PUT update an existing user
router.route('/:id').put(logRoute, updateUser)

// DELETE a user by ID
router.route('/:id').delete(logRoute, deleteUser)

module.exports = router
