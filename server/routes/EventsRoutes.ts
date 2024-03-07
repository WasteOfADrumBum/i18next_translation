import express, { Request, Response } from 'express'
import EventsModel from '../models/EventsModel'

const router = express.Router()

// GET all events
router.get('/', async (req: Request, res: Response) => {
	try {
		const events = await EventsModel.find()
		res.json(events)
	} catch (err: any) {
		res.status(500).json({ message: err.message })
	}
})

// GET a single event by ID
router.get('/:id', getEvent, (req: Request, res: Response) => {
	res.json(res.locals.event)
})

// CREATE a new event
router.post('/', async (req: Request, res: Response) => {
	const eventData = req.body
	try {
		const newEvent = await EventsModel.create(eventData)
		res.status(201).json(newEvent)
	} catch (err: any) {
		res.status(400).json({ message: err.message })
	}
})

// UPDATE an event
router.patch('/:id', getEvent, async (req: Request, res: Response) => {
	try {
		Object.assign(res.locals.event, req.body)
		const updatedEvent = await res.locals.event.save()
		res.json(updatedEvent)
	} catch (err: any) {
		res.status(400).json({ message: err.message })
	}
})

// DELETE an event
router.delete('/:id', getEvent, async (req: Request, res: Response) => {
	try {
		await res.locals.event.remove()
		res.json({ message: 'Event deleted' })
	} catch (err: any) {
		res.status(500).json({ message: err.message })
	}
})

// Middleware to fetch event by ID
async function getEvent(req: Request, res: Response, next: any) {
	try {
		const event = await EventsModel.findById(req.params.id)
		if (!event) {
			return res.status(404).json({ message: 'Event not found' })
		}
		res.locals.event = event
		next()
	} catch (err: any) {
		return res.status(500).json({ message: err.message })
	}
}

export default router
