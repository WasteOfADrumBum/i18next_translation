export type Event = {
	id: string | null
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
