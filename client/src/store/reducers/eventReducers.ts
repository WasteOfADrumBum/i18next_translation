import {
	EventActionTypes,
	FETCH_EVENTS_REQUEST,
	FETCH_EVENTS_SUCCESS,
	FETCH_EVENTS_FAILURE,
	ADD_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
} from '../actions/eventActions'
import { Event } from '../../../../shared/types/events/EventTypes'

interface EventState {
	events: Event[]
	loading: boolean
	error: string | null
}

const initialState: EventState = {
	events: [],
	loading: false,
	error: null,
}

const eventReducers = (state = initialState, action: EventActionTypes): EventState => {
	switch (action.type) {
		case FETCH_EVENTS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case FETCH_EVENTS_SUCCESS:
			return {
				...state,
				loading: false,
				events: action.payload,
				error: null,
			}
		case FETCH_EVENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case ADD_EVENT:
			return {
				...state,
				events: [...state.events, action.payload],
			}
		case UPDATE_EVENT:
			return {
				...state,
				events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
			}
		case DELETE_EVENT:
			return {
				...state,
				events: state.events.filter((event) => event.id !== action.payload),
			}
		default:
			return state
	}
}

export default eventReducers
