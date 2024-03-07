export type Event = {
	id: string
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
		zip: string
		country: string
		county: string
		state: string
	}
}
