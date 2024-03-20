import { ErrorResponse, SuccessResponse } from './ResponseTypes'

// Define the interface for an entity
export interface Entity {
	_id: string | null
	parent: {
		_id: string | null
		name: string | null
	}
	type: string | null
	person: {
		name: {
			first: string | null
			middle: string | null
			last: string | null
			suffix: string | null
		}
		dob: Date | null
		age: string | null
		nativeLanguage: string | null
		identification: {
			ssn: string | null
			passportNumber: string | null
			passportCountry: string | null
			driverLicenseNumber: string | null
			driverLicenseState: string | null
			nationalIdNumber: string | null
			visaType: string | null
			visaExpiryDate: Date | null
			isIllegalResident: boolean | null
			illegalStatusDescription: string | null
		}
		employment: {
			jobTitle: string | null
			department: string | null
			employeeId: string | null
			hireDate: Date | null
			employmentStatus: string | null
		}
	}
	organization: {
		contactName: string | null
		legal: {
			legalName: string | null
			legalEntityType: string | null
			legalStatus: string | null
			incorporationDate: Date | null
			businessRegistrationNumber: string | null
		}
	}
	contact: {
		phone: string | null
		email: string | null
		socialMedia: string | null
	}
	address: {
		address: string | null
		city: string | null
		state: string | null
		zip: number | null
		county: string | null
		country: string | null
	}
}

// Define the state for entities
export interface EntityState {
	entities: Entity[]
	entity: Entity | null
	loading: boolean
	success?: SuccessResponse
	error?: ErrorResponse
}

// Define the actions that can be performed on entities
export type EntityAction = {
	type: string
	payload: Entity | string
}

// Define the type for the dispatcher function
export type DispatchType = (args: EntityAction) => EntityAction

// Define initial action state
export const initialState: EntityState = {
	entities: [],
	entity: null,
	loading: false,
}
