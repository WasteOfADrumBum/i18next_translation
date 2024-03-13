import { EventState, Event, EventAction } from '../../types/EventTypes'

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

const initialState: EventState = {
	events: [],
	loading: false,
	error: null,
}

const eventReducer = (state: EventState = initialState, action: EventAction) => {
	switch (action.type) {
		case CREATE_EVENT_REQUEST:
		case DELETE_EVENT_REQUEST:
		case UPDATE_EVENT_REQUEST:
		case GET_EVENTS_REQUEST:
		case GET_EVENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case CREATE_EVENT_SUCCESS:
			return {
				...state,
				events: [...state.events, action.event],
				loading: false,
				error: null,
			}
		case DELETE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.filter((event) => event.id !== action.event.id),
				loading: false,
				error: null,
			}
		case UPDATE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.map((event) => {
					if (event.id === action.event.id) {
						return action.event
					}
					return event
				}),
				loading: false,
				error: null,
			}
		case GET_EVENTS_SUCCESS:
			return {
				...state,
				events: action.event,
				loading: false,
				error: null,
			}
		case GET_EVENT_SUCCESS:
			return {
				...state,
				events: [action.event],
				loading: false,
				error: null,
			}
		case CREATE_EVENT_FAILURE:
		case DELETE_EVENT_FAILURE:
		case UPDATE_EVENT_FAILURE:
		case GET_EVENTS_FAILURE:
		case GET_EVENT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.event ? 'An error occurred' : null,
			}
		default:
			return state
	}
}

export default eventReducer
