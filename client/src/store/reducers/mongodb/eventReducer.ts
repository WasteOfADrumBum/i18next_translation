import { EventState, EventAction, initialState } from '../../types/EventTypes'

// Action types
import * as actionTypes from '../../types/constants/eventConstants'

const eventReducer = (state: EventState = initialState, action: EventAction) => {
	switch (action.type) {
		case actionTypes.CREATE_EVENT_REQUEST:
		case actionTypes.DELETE_EVENT_REQUEST:
		case actionTypes.UPDATE_EVENT_REQUEST:
		case actionTypes.GET_EVENTS_REQUEST:
		case actionTypes.GET_EVENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			}
		case actionTypes.CREATE_EVENT_SUCCESS:
			return {
				...state,
				events: [...state.events, action.event],
				loading: false,
				error: null,
			}
		case actionTypes.DELETE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.filter((event) => event.id !== action.event.id),
				loading: false,
				error: null,
			}
		case actionTypes.UPDATE_EVENT_SUCCESS:
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
		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				events: action.event,
				loading: false,
				error: null,
			}
		case actionTypes.GET_EVENT_SUCCESS:
			return {
				...state,
				events: [action.event],
				loading: false,
				error: null,
			}
		case actionTypes.CREATE_EVENT_FAILURE:
		case actionTypes.DELETE_EVENT_FAILURE:
		case actionTypes.UPDATE_EVENT_FAILURE:
		case actionTypes.GET_EVENTS_FAILURE:
		case actionTypes.GET_EVENT_FAILURE:
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
