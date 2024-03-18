// Define the interface for an entity
export interface Entity {
	_id: string | null
	parent: {
		_id: string | null
		name: string
	}
	type: string
	person: {
		name: {
			first: string
			middle: string | null
			last: string
			suffix: string | null
		}
		dob: string
		age: string | null
		nativeLanguage: string | null
		identification: {
			ssn: string | null
			passportNumber: string | null
			driverLicenseNumber: string | null
			nationalIdNumber: string | null
			taxIdNumber: string | null
			visaType: string | null
			visaExpiryDate: Date | null
			isLegalResident: boolean | null
			illegalStatusDescription: string | null
		}
		employment: {
			jobTitle: string | null
			department: string | null
			employeeId: string | null
			hireDate: string | null
			employmentStatus: string | null
		}
	}
	organization: {
		contactName: string
		legal: {
			legalName: string
			legalEntityType: string | null
			legalStatus: string | null
			incorporationDate: string | null
			businessRegistrationNumber: string | null
		}
	}
	contact: {
		name: string
		phone: string
		email: string
		socialMedia: string | null
	}
	address: {
		address: string
		city: string
		state: string
		zip: number
		county: string | null
		country: string
	}
}

// Define the state for entities
export interface EntityState {
	entities: Entity[]
	entity: Entity | null
	loading: boolean
	success?: {}
	error?: {}
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
	success: {},
	error: {},
}
