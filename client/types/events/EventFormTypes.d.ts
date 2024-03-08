export interface EventFormData {
	id?: string
	reporter: string
	reportedDate: string
	updatedBy: string
	updatedDate: string
	submittedBy: string
	submittedDate: string
	eventType: string
	eventSubType: string
	title: string
	description: string
	tagging: string[]
	methodOfReceipt: string
	address: string
	city: string
	zip: number
	country: string
	county: string
	state: string
}
