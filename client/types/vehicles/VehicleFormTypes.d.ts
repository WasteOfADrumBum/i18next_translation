export interface VehicleFormData {
	_id?: string
	parentId: string | null
	parentName: string
	make: string
	model: string
	year: number
	color: string
	occupantsDriver: string | null // UUID from entities
	occupantsPassengers: string[] // Array of UUIDs from entities
	registrationOwner: string | null // UUID from entities
	registrationPlateNumber: string
	registrationExpirationDate: Date
	registrationState: string
	insurancePolicyNumber?: string
	insuranceProvider?: string
	insuranceExpirationDate?: Date
	insuranceInsured: boolean
	stolen: boolean
	illegalModificationsWasModified: boolean
	illegalModificationsDescription?: string
}
