import axios from 'axios'
import { Dispatch } from 'redux'
import { Event } from '../../../../shared/types/events/EventTypes'
import translations from '../../i18n/locales'

const errorTranslations = translations.errors

// Action Types
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE'
export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

// Define action types
interface FetchEventsRequest {
	type: typeof FETCH_EVENTS_REQUEST
}

interface FetchEventsSuccess {
	type: typeof FETCH_EVENTS_SUCCESS
	payload: Event[] // Assuming payload is an array of events
}

interface FetchEventsFailure {
	type: typeof FETCH_EVENTS_FAILURE
	payload: string // Assuming payload is an error message
}

interface AddEvent {
	type: typeof ADD_EVENT
	payload: Event // Assuming payload is a single event
}

interface UpdateEvent {
	type: typeof UPDATE_EVENT
	payload: Event // Assuming payload is a single event
}

interface DeleteEvent {
	type: typeof DELETE_EVENT
	payload: number // Assuming payload is the ID of the event to delete
}

// Fetch all events
export const fetchEvents = () => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch({ type: FETCH_EVENTS_REQUEST })
			const res = await axios.get('/api/events')
			dispatch({ type: FETCH_EVENTS_SUCCESS, payload: res.data })
		} catch (err: any) {
			dispatch({
				type: FETCH_EVENTS_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}
}

// Add a new event
export const addEvent = (event: Event) => {
	return async (dispatch: Dispatch) => {
		try {
			const res = await axios.post('/api/events', event)
			dispatch({ type: ADD_EVENT, payload: res.data })
		} catch (err: any) {
			dispatch({
				type: FETCH_EVENTS_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}
}

// Update an event
export const updateEvent = (id: number, updatedEvent: Event) => {
	return async (dispatch: Dispatch) => {
		try {
			const res = await axios.put(`/api/events/${id}`, updatedEvent)
			dispatch({ type: UPDATE_EVENT, payload: res.data })
		} catch (err: any) {
			dispatch({
				type: FETCH_EVENTS_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}
}

// Delete an event
export const deleteEvent = (id: number) => {
	return async (dispatch: Dispatch) => {
		try {
			await axios.delete(`/api/events/${id}`)
			dispatch({ type: DELETE_EVENT, payload: id })
		} catch (err: any) {
			dispatch({
				type: FETCH_EVENTS_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}
}

export type EventActionTypes =
	| FetchEventsRequest
	| FetchEventsSuccess
	| FetchEventsFailure
	| AddEvent
	| UpdateEvent
	| DeleteEvent
