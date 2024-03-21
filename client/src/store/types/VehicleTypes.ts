import { ErrorResponse, SuccessResponse } from './ResponseTypes'

// Define the interface for a vehicle
export interface Vehicle {
	_id: string | null
	parent: {
		_id: string | null
		name: string
	}
	make: string
	model: string
	year: number
	color: string
	vin: string
	occupants: {
		driver: string | null // UUID from entities
		passengers: string[] // Array of UUIDs from entities
	}
	registration: {
		owner: string | null // UUID from entities
		plateNumber: string
		expirationDate: Date
		state: string
	}
	insurance?: {
		policyNumber?: string
		provider?: string
		expirationDate?: Date
		insured: boolean
	}
	stolen: boolean
	illegalModifications: {
		wasModified: boolean
		description?: string
	}
}

// Define the state for vehicles
export interface VehicleState {
	vehicles: Vehicle[]
	vehicle: Vehicle | null
	loading: boolean
	success?: SuccessResponse
	error?: ErrorResponse
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
}
