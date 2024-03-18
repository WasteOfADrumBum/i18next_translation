// Define the interface for an vehicle
export interface Vehicle {
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
		vehicleType: string
		vehicleSubType: string
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

// Define the state for vehicles
export interface VehicleState {
	vehicles: Vehicle[]
	vehicle: Vehicle | null
	loading: boolean
	success?: {}
	error?: {}
}

// Define the actions that can be performed on vehicles
export type VehicleAction = {
	type: string
	payload: Vehicle | string
}

// Define the type for the dispatcher function
export type DispatchType = (args: VehicleAction) => VehicleAction

// Define initial action state
export const initialState: VehicleState = {
	vehicles: [],
	vehicle: null,
	loading: false,
	success: {},
	error: {},
}
