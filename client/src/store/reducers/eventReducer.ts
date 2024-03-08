import { EventAction } from '../actions/eventActions'
import { Event } from '../../../types/events/EventTypes'

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

const eventReducers = (state = initialState, action: EventAction): EventState => {
	console.log('Previous State (Reducer):', state)
	console.log('Action (Reducer):', action)

	switch (action.type) {
		case 'FETCH_EVENTS_REQUEST':
			return {
				...state,
				loading: true,
			}
		case 'FETCH_EVENTS_SUCCESS':
			return {
				...state,
				loading: false,
				events: action.payload,
				error: null,
			}
		case 'FETCH_EVENTS_FAILURE':
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case 'ADD_EVENT_SUCCESS':
			return {
				...state,
				events: [...state.events, action.payload],
			}
		case 'ADD_EVENTS_FAILURE':
			return {
				...state,
				error: action.payload,
			}
		case 'UPDATE_EVENT_SUCCESS':
			return {
				...state,
				events: state.events.map((event) => (event.id === action.payload.id ? action.payload : event)),
			}
		case 'UPDATE_EVENT_FAILURE':
			return {
				...state,
				error: action.payload,
			}
		case 'DELETE_EVENT_SUCCESS':
			return {
				...state,
				events: state.events.filter((event) => String(event.id) !== action.payload),
			}
		case 'DELETE_EVENTS_FAILURE':
			return {
				...state,
				error: action.payload,
			}
		default:
			return state
	}
}

export default eventReducers
