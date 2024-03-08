export type Event = {
	id: string | null
	reported: {
		reporter: string
		reportedDate: string
	}
	updated: {
		updatedBy: string
		updatedDate: string
	}
	submitted: {
		submittedBy: string
		submittedDate: string
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
		zip: number
		country: string
		county: string
		state: string
	}
}
