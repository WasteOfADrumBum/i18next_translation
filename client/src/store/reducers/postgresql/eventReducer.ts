import {
	EventActionTypes,
	EventState,
	GET_EVENTS,
	ADD_EVENT,
	UPDATE_EVENT,
	DELETE_EVENT,
} from '../../../../types/events/EventTypesPG'

const initialState: EventState = {
	events: [],
}

const eventReducer = (state = initialState, action: EventActionTypes): EventState => {
	switch (action.type) {
		case GET_EVENTS:
			return {
				...state,
				events: action.payload,
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

export default eventReducer
