import axios from 'axios'
import { Event } from '../../../types/events/EventTypes'
import translations from '../../i18n/locales'

const errorTranslations = translations.errors

// Create custom Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000', // Set the base URL to your server's address
	// You can also add other default configurations here if needed
})

// Action Types
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS'
export const ADD_EVENTS_FAILURE = 'ADD_EVENTS_FAILURE'
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS'
export const UPDATE_EVENT_FAILURE = 'UPDATE_EVENT_FAILURE'
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS'
export const DELETE_EVENTS_FAILURE = 'DELETE_EVENTS_FAILURE'

// Define action types
interface FetchEventsRequest {
	type: typeof FETCH_EVENTS_REQUEST
}

interface FetchEventsSuccess {
	type: typeof FETCH_EVENTS_SUCCESS
	payload: Event[]
}

interface FetchEventsFailure {
	type: typeof FETCH_EVENTS_FAILURE
	payload: string
}

interface AddEventSuccess {
	type: typeof ADD_EVENT_SUCCESS
	payload: Event
}

interface AddEventFailure {
	type: typeof ADD_EVENTS_FAILURE
	payload: string
}

interface UpdateEventSuccess {
	type: typeof UPDATE_EVENT_SUCCESS
	payload: Event
}

interface UpdateEventFailure {
	type: typeof UPDATE_EVENT_FAILURE
	payload: string
}

interface DeleteEventSuccess {
	type: typeof DELETE_EVENT_SUCCESS
	payload: string
}

interface DeleteEventFailure {
	type: typeof DELETE_EVENTS_FAILURE
	payload: string
}

// Define action creator functions
export const fetchEvents = () => async (dispatch: any) => {
	try {
		dispatch({ type: FETCH_EVENTS_REQUEST })
		const res = await axiosInstance.get('/api/events')
		dispatch({ type: FETCH_EVENTS_SUCCESS, payload: res.data })
	} catch (err: any) {
		dispatch({
			type: FETCH_EVENTS_FAILURE,
			payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
		})
	}
}

export const addEvent = (event: Event) => async (dispatch: any) => {
	console.log('Attempting to add event (Action): ', event)
	console.log('Axios instance (Action): ', axiosInstance)
	console.log('Axios instance defaults (Action): ', axiosInstance.defaults)
	console.log('Axios instance base URL (Action): ', axiosInstance.defaults.baseURL)
	console.log('Axios instance headers (Action): ', axiosInstance.defaults.headers)
	console.log('Axios instance interceptors (Action): ', axiosInstance.interceptors)
	console.log('Dispatch (Action): ', dispatch)
	try {
		console.log('Try to add event (Action): ', event)
		const res = await axiosInstance.post('/api/events', event)
		console.log('Response from POST request (Action): ', res)
		dispatch({ type: ADD_EVENT_SUCCESS, payload: res.data })
	} catch (err: any) {
		console.error('Error details (Action): ', err.message)
		console.error('Error response (Action): ', err.response)
		dispatch({
			type: ADD_EVENTS_FAILURE,
			payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
		})
	}
}

export const updateEvent = (id: string, updatedEvent: Event) => async (dispatch: any) => {
	try {
		const res = await axiosInstance.put(`/api/events/${id}`, updatedEvent)
		dispatch({ type: UPDATE_EVENT_SUCCESS, payload: res.data })
	} catch (err: any) {
		dispatch({
			type: UPDATE_EVENT_FAILURE,
			payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
		})
	}
}

export const deleteEvent = (id: string) => async (dispatch: any) => {
	try {
		await axiosInstance.delete(`/api/events/${id}`)
		dispatch({ type: DELETE_EVENT_SUCCESS, payload: id })
	} catch (err: any) {
		dispatch({
			type: DELETE_EVENTS_FAILURE,
			payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
		})
	}
}

// Define the union type for all action types
export type EventAction =
	| FetchEventsRequest
	| FetchEventsSuccess
	| FetchEventsFailure
	| AddEventSuccess
	| AddEventFailure
	| UpdateEventSuccess
	| UpdateEventFailure
	| DeleteEventSuccess
	| DeleteEventFailure
