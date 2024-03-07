import express from 'express'
import { createUser } from '../controllers/UserController'

const router = express.Router()

// POST /users
router.post('/', createUser)

// Define other routes as needed

export default router
