import { Dispatch } from 'redux'
import axios from 'axios'
import { Event } from '../../types/EventTypes'
import translations from '../../../i18n/locales'

// Action types
import {
	CREATE_EVENT_REQUEST,
	CREATE_EVENT_SUCCESS,
	CREATE_EVENT_FAILURE,
	DELETE_EVENT_REQUEST,
	DELETE_EVENT_SUCCESS,
	DELETE_EVENT_FAILURE,
	UPDATE_EVENT_REQUEST,
	UPDATE_EVENT_SUCCESS,
	UPDATE_EVENT_FAILURE,
	GET_EVENTS_REQUEST,
	GET_EVENTS_SUCCESS,
	GET_EVENTS_FAILURE,
	GET_EVENT_REQUEST,
	GET_EVENT_SUCCESS,
	GET_EVENT_FAILURE,
} from '../../../constants/events'

// Error translations
const errorTranslations = translations.errors

// Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api', // Set the base URL to your server's address
})

// Action creators
export const createEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		dispatch({ type: CREATE_EVENT_REQUEST })
		const response = await axiosInstance.post('/events', event)
		dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: CREATE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const deleteEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')
	try {
		dispatch({ type: DELETE_EVENT_REQUEST })
		await axiosInstance.delete(`/events/${eventId}`)
		dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId })
	} catch (error) {
		dispatch({ type: DELETE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const updateEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')
	try {
		dispatch({ type: UPDATE_EVENT_REQUEST })
		await axiosInstance.put(`/events/${event.id}`, event)
		dispatch({ type: UPDATE_EVENT_SUCCESS, payload: event })
	} catch (error) {
		dispatch({ type: UPDATE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const getEvents = () => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Events\x1b[0m')
	try {
		dispatch({ type: GET_EVENTS_REQUEST })
		const response = await axiosInstance.get('/events')
		dispatch({ type: GET_EVENTS_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: GET_EVENTS_FAILURE, payload: errorTranslations.genericError })
	}
}

export const getEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Event\x1b[0m')
	try {
		dispatch({ type: GET_EVENT_REQUEST })
		const response = await axiosInstance.get(`/events/${eventId}`)
		dispatch({ type: GET_EVENT_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: GET_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}
