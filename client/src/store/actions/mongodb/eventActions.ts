import axios from 'axios'
import { Event } from '../../types/EventTypes'
import translations from '../../../i18n/locales'
import { AppDispatch } from '../../../store'

// Action types
import * as actionTypes from '../../types/constants/eventConstants'

// Error translations
const errorTranslations = translations.errors

// Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api', // Set the base URL to your server's address
})

// Action creators
export const createEvent = (event: Event) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		dispatch({ type: actionTypes.CREATE_EVENT_REQUEST })
		const response = await axiosInstance.post('/events', event)
		dispatch({ type: actionTypes.CREATE_EVENT_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: actionTypes.CREATE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const deleteEvent = (eventId: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')
	try {
		dispatch({ type: actionTypes.DELETE_EVENT_REQUEST })
		await axiosInstance.delete(`/events/${eventId}`)
		dispatch({ type: actionTypes.DELETE_EVENT_SUCCESS, payload: eventId })
	} catch (error) {
		dispatch({ type: actionTypes.DELETE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const updateEvent = (event: Event) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')
	try {
		dispatch({ type: actionTypes.UPDATE_EVENT_REQUEST })
		await axiosInstance.put(`/events/${event.id}`, event)
		dispatch({ type: actionTypes.UPDATE_EVENT_SUCCESS, payload: event })
	} catch (error) {
		dispatch({ type: actionTypes.UPDATE_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}

export const getEvents = () => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Events\x1b[0m')
	try {
		dispatch({ type: actionTypes.GET_EVENTS_REQUEST })
		const response = await axiosInstance.get('/events')
		dispatch({ type: actionTypes.GET_EVENTS_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: actionTypes.GET_EVENTS_FAILURE, payload: errorTranslations.genericError })
	}
}

export const getEvent = (eventId: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Event\x1b[0m')
	try {
		dispatch({ type: actionTypes.GET_EVENT_REQUEST })
		const response = await axiosInstance.get(`/events/${eventId}`)
		dispatch({ type: actionTypes.GET_EVENT_SUCCESS, payload: response.data })
	} catch (error) {
		dispatch({ type: actionTypes.GET_EVENT_FAILURE, payload: errorTranslations.genericError })
	}
}
