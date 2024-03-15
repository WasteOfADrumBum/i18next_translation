// Define the interface for an event
export interface Event {
	_id: string | null
	status: string
	reported: {
		reporter: string
		reportedDate: Date
	}
	updated: {
		updatedBy: string
		updatedDate: Date
	}
	submitted: {
		submittedBy: string
		submittedDate: Date
	}
	type: {
		eventType: string
		eventSubType: string
	}
	details: {
		title: string
		description: string
		tagging: string[]
		methodOfReceipt: string
	}
	location: {
		address: string
		city: string
		zip: number | null
		country: string
		county: string
		state: string
	}
}

// Define the state for events
export interface EventState {
	events: Event[]
	event: Event | Event[] | null
	loading: boolean
	success?: {}
	error?: {}
}

// Define the actions that can be performed on events
export type EventAction = {
	type: string
	payload: Event | string
}

// Define the type for the dispatcher function
export type DispatchType = (args: EventAction) => EventAction

// Define initial action state
export const initialState: EventState = {
	events: [],
	event: null,
	loading: false,
	success: {},
	error: {},
}
