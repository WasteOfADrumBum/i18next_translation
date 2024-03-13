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
export const CREATE_POSTGRES_EVENT = 'CREATE_POSTGRES_EVENT'
export const DELETE_POSTGRES_EVENT = 'DELETE_POSTGRES_EVENT'
export const UPDATE_POSTGRES_EVENT = 'UPDATE_POSTGRES_EVENT'
export const GET_POSTGRES_EVENTS = 'GET_POSTGRES_EVENTS'
export const GET_POSTGRES_EVENT = 'GET_POSTGRES_EVENT'
export const SET_POSTGRES_LOADING = 'SET_POSTGRES_LOADING'
export const SET_POSTGRES_ERROR = 'SET_POSTGRES_ERROR'

// Action Creators
export const createPostgresEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		dispatch({ type: SET_POSTGRES_LOADING })
		const response = await axiosInstance.post('/events', event)
		dispatch({ type: CREATE_POSTGRES_EVENT, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_POSTGRES_ERROR, payload: errorTranslations.genericError })
	}
}

export const deletePostgresEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')
	try {
		dispatch({ type: SET_POSTGRES_LOADING })
		await axiosInstance.delete(`/events/${eventId}`)
		dispatch({ type: DELETE_POSTGRES_EVENT, payload: eventId })
	} catch (error) {
		dispatch({ type: SET_POSTGRES_ERROR, payload: errorTranslations.genericError })
	}
}

export const updatePostgresEvent = (event: Event) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')
	try {
		dispatch({ type: SET_POSTGRES_LOADING })
		await axiosInstance.put(`/events/${event.id}`, event)
		dispatch({ type: UPDATE_POSTGRES_EVENT, payload: event })
	} catch (error) {
		dispatch({ type: SET_POSTGRES_ERROR, payload: errorTranslations.genericError })
	}
}

export const getPostgresEvents = () => async (dispatch: Dispatch) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mGet Events\x1b[0m')
	try {
		dispatch({ type: SET_POSTGRES_LOADING })
		const response = await axiosInstance.get('/events')
		dispatch({ type: GET_POSTGRES_EVENTS, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_POSTGRES_ERROR, payload: errorTranslations.genericError })
	}
}

export const getPostgresEvent = (eventId: string) => async (dispatch: Dispatch) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mGet Event\x1b[0m')
	try {
		dispatch({ type: SET_POSTGRES_LOADING })
		const response = await axiosInstance.get(`/events/${eventId}`)
		dispatch({ type: GET_POSTGRES_EVENT, payload: response.data })
	} catch (error) {
		dispatch({ type: SET_POSTGRES_ERROR, payload: errorTranslations.genericError })
	}
}
