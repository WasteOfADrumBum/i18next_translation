import { Event } from '../../../../types/events/EventTypes'

interface Action<T> {
	type: string
	payload: T
}

interface PostgresEventState {
	events: Event[]
	loading: boolean
	error: string | null
}

const initialState: PostgresEventState = {
	events: [],
	loading: false,
	error: null,
}

const postgresEventReducer = (state: PostgresEventState = initialState, action: Action<Event[] | Event | string>) => {
	switch (action.type) {
		case 'CREATE_POSTGRES_EVENT':
			return {
				...state,
				events: [...state.events, action.payload as Event],
			}
		case 'DELETE_POSTGRES_EVENT':
			return {
				...state,
				events: state.events.filter((event) => event.id !== (action.payload as string)),
			}
		case 'UPDATE_POSTGRES_EVENT':
			return {
				...state,
				events: state.events.map((event) => {
					if (event.id === (action.payload as Event).id) {
						return action.payload
					}
					return event
				}),
			}
		case 'GET_POSTGRES_EVENTS':
			return {
				...state,
				events: action.payload as Event[],
				loading: false,
				error: null,
			}
		case 'GET_POSTGRES_EVENT':
			return {
				...state,
				events: [action.payload as Event],
				loading: false,
				error: null,
			}
		case 'SET_POSTGRES_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'SET_POSTGRES_ERROR':
			return {
				...state,
				error: action.payload as string,
				loading: false,
			}
		default:
			return state
	}
}

export default postgresEventReducer
