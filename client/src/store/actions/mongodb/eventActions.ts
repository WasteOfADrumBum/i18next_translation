import axios from 'axios'
import { AppDispatch } from '../../../store'
import { Event } from '../../types/EventTypes'

// Action types
import * as actionTypes from '../../types/constants/eventConstants'

// Set the base URL to your server's address
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

// @Route   GET api/events
// @Desc    Read All Events
// @Action  getEvents()
// @Access  Private
export const getEvents = () => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Events\x1b[0m')
	try {
		const res = await axiosInstance.get('/events')
		dispatch({
			type: actionTypes.GET_EVENTS_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.GET_EVENTS_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.GET_EVENTS_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   GET api/events/:id
// @Desc    Read Event by ID
// @Action  readEvent()
// @Access  Private
export const readEvent = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mRead Event\x1b[0m')
	console.log('\x1b[36mMongoDB:\x1b[0m Action Event ID \x1b[32m' + id + '\x1b[0m')
	try {
		const res = await axiosInstance.get(`/events/${id}`)
		dispatch({
			type: actionTypes.GET_EVENT_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.GET_EVENT_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.GET_EVENT_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   POST api/events
// @Desc    Create Event
// @Action  createEvent()
// @Access  Private
export const createEvent = (event: Event) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		const res = await axiosInstance.post('/events', event)
		dispatch({
			type: actionTypes.CREATE_EVENT_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.CREATE_EVENT_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.CREATE_EVENT_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   PUT api/events/:id
// @Desc    Update Event
// @Action  updateEvent()
// @Access  Private
export const updateEvent = (event: Event) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')
	try {
		const res = await axiosInstance.put(`/events/${event._id}`, event)
		dispatch({
			type: actionTypes.UPDATE_EVENT_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.UPDATE_EVENT_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.UPDATE_EVENT_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   DELETE api/events/:id
// @Desc    Delete Event
// @Action  deleteEvent()
// @Access  Private
export const deleteEvent = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')
	console.log('\x1b[36mMongoDB:\x1b[0m Action Event ID \x1b[32m' + id + '\x1b[0m')
	try {
		await axiosInstance.delete(`/events/${id}`)
		dispatch({
			type: actionTypes.DELETE_EVENT_SUCCESS,
			payload: id,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.DELETE_EVENT_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.DELETE_EVENT_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}
