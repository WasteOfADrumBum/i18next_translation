import axios from 'axios'
import { Dispatch } from 'redux'
import { Event } from '../../../../types/events/EventTypes'
import translations from '../../../i18n/locales'

const errorTranslations = translations.errors

// Create custom Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api', // Set the base URL to your server's address
})

// Action Types
export const CREATE_EVENT = 'CREATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const GET_EVENTS = 'GET_EVENTS'
export const GET_EVENT = 'GET_EVENT'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'

// Action Creators
export const createEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		dispatch({ type: SET_LOADING })
		const response = await axiosInstance.post('/events', event)
		dispatch({ type: CREATE_EVENT, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: errorTranslations.genericError })
	}
}

export const deleteEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')

	try {
		dispatch({ type: SET_LOADING })
		await axiosInstance.delete(`/events/${eventId}`)
		dispatch({ type: DELETE_EVENT, payload: eventId })
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: errorTranslations.genericError })
	}
}

export const updateEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')

	try {
		dispatch({ type: SET_LOADING })
		await axiosInstance.put(`/events/${event.id}`, event)
		dispatch({ type: UPDATE_EVENT, payload: event })
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: errorTranslations.genericError })
	}
}

export const getEvents = () => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Events\x1b[0m')
	try {
		dispatch({ type: SET_LOADING })
		const response = await axiosInstance.get('/events')
		dispatch({ type: GET_EVENTS, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: errorTranslations.genericError })
	}
}

export const getEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Event\x1b[0m')
	try {
		dispatch({ type: SET_LOADING })
		const response = await axiosInstance.get(`/events/${eventId}`)
		dispatch({ type: GET_EVENT, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_ERROR, payload: errorTranslations.genericError })
	}
}
