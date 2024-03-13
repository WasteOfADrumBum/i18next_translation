export interface EventFormData {
	id?: string
	status: string
	reporter: string
	reportedDate: Date
	updatedBy: string
	updatedDate: Date
	submittedBy: string
	submittedDate: Date
	eventType: string
	eventSubType: string
	title: string
	description: string
	tagging: string[]
	methodOfReceipt: string
	address: string
	city: string
	zip: number | null
	country: string
	county: string
	state: string
}
