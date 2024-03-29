import * as actionTypes from '../../types/constants/eventConstants'
import { Event, EventAction, EventState, initialState } from '../../types/EventTypes'

const eventReducer = (state: EventState = initialState, action: EventAction): EventState => {
	switch (action.type) {
		case actionTypes.CREATE_EVENT_REQUEST:
		case actionTypes.DELETE_EVENT_REQUEST:
		case actionTypes.UPDATE_EVENT_REQUEST:
		case actionTypes.GET_EVENTS_REQUEST:
		case actionTypes.GET_EVENT_REQUEST:
			return {
				...state,
				loading: true,
			}
		case actionTypes.CREATE_EVENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: { message: 'Event created successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.DELETE_EVENT_SUCCESS:
			return {
				...state,
				events: state.events.filter((event) => event._id !== action.payload),
				loading: false,
				success: { message: 'Event deleted successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.UPDATE_EVENT_SUCCESS:
		case actionTypes.GET_EVENT_SUCCESS:
			return {
				...state,
				event: action.payload as Event,
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.GET_EVENTS_SUCCESS:
			return {
				...state,
				events: action.payload as unknown as Event[],
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.CREATE_EVENT_FAILURE:
		case actionTypes.DELETE_EVENT_FAILURE:
		case actionTypes.UPDATE_EVENT_FAILURE:
		case actionTypes.GET_EVENTS_FAILURE:
		case actionTypes.GET_EVENT_FAILURE:
			return {
				...state,
				loading: false,
				error: { message: 'Operation failed', errorCode: 500 },
			}
		default:
			return state
	}
}

export default eventReducer
