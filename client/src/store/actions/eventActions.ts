import axios from 'axios'
import { Event } from '../../../../shared/types/events/EventTypes'
import translations from '../../i18n/locales'
import { RootState } from 'store'
import { ThunkAction } from 'redux-thunk'

const errorTranslations = translations.errors

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
export const fetchEvents = (): ThunkAction<void, RootState, unknown, EventAction> => async (dispatch) => {
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

export const addEvent =
	(event: Event): ThunkAction<void, RootState, unknown, EventAction> =>
	async (dispatch) => {
		try {
			const res = await axios.post('/api/events', event)
			dispatch({ type: ADD_EVENT_SUCCESS, payload: res.data })
		} catch (err: any) {
			dispatch({
				type: ADD_EVENTS_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}

export const updateEvent =
	(id: string, updatedEvent: Event): ThunkAction<void, RootState, unknown, EventAction> =>
	async (dispatch) => {
		try {
			const res = await axios.put(`/api/events/${id}`, updatedEvent)
			dispatch({ type: UPDATE_EVENT_SUCCESS, payload: res.data })
		} catch (err: any) {
			dispatch({
				type: UPDATE_EVENT_FAILURE,
				payload: err.response?.data?.message || errorTranslations.unknownErrorOccurred,
			})
		}
	}

export const deleteEvent =
	(id: string): ThunkAction<void, RootState, unknown, EventAction> =>
	async (dispatch) => {
		try {
			await axios.delete(`/api/events/${id}`)
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
