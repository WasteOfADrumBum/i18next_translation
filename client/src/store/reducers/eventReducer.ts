import { Event } from '../../../types/events/EventTypes'

interface Action<T> {
	type: string
	payload: T
}

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

const eventReducer = (state: EventState = initialState, action: Action<Event[] | Event | string>) => {
	switch (action.type) {
		case 'CREATE_EVENT':
			return {
				...state,
				events: [...state.events, action.payload as Event],
			}
		case 'DELETE_EVENT':
			return {
				...state,
				events: state.events.filter((event) => event.id !== (action.payload as string)),
			}
		case 'UPDATE_EVENT':
			return {
				...state,
				events: state.events.map((event) => {
					if (event.id === (action.payload as Event).id) {
						return action.payload
					}
					return event
				}),
			}
		case 'GET_EVENTS':
			return {
				...state,
				events: action.payload as Event[],
				loading: false,
				error: null,
			}
		case 'GET_EVENT':
			return {
				...state,
				events: [action.payload as Event],
				loading: false,
				error: null,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload as string,
				loading: false,
			}
		default:
			return state
	}
}

export default eventReducer
