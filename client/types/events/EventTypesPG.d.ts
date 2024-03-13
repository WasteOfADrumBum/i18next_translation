// Define action types
export const GET_EVENTS = 'GET_EVENTS'
export const ADD_EVENT = 'ADD_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

// Define event interface
export interface Event {
	id: number
	status: string
	// Add other properties of the event here
}

// Define action interfaces
export interface GetEventsAction {
	type: typeof GET_EVENTS
	payload: Event[]
}

export interface AddEventAction {
	type: typeof ADD_EVENT
	payload: Event
}

export interface UpdateEventAction {
	type: typeof UPDATE_EVENT
	payload: Event
}

export interface DeleteEventAction {
	type: typeof DELETE_EVENT
	payload: number // Event ID
}

export type EventActionTypes = GetEventsAction | AddEventAction | UpdateEventAction | DeleteEventAction

// Define state interface
export interface EventState {
	events: Event[]
}
