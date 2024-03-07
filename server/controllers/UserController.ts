import { Request, Response } from 'express'
import User from '../models/UserModel'

export const createUser = async (req: Request, res: Response) => {
	try {
		const newUser = new User(req.body)
		await newUser.save()
		res.status(201).json(newUser)
	} catch (error: any) {
		res.status(500).json({ error: error.message })
	}
}

// Implement other controller functions as needed (e.g., updateUser, deleteUser, getUserById, getUsers, etc.)
