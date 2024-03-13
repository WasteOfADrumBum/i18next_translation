// Define the interface for an event
export interface Event {
	id: string | null
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
	loading: boolean
	error: string | null
}

// Define the actions that can be performed on events
export type EventAction = {
	type: string
	event: Event
}

// Define the type for the dispatcher function
export type DispatchType = (args: EventAction) => EventAction

// Define initial action state
export const initialState: EventState = {
	events: [],
	loading: false,
	error: null,
}
