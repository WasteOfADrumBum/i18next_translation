import casual from 'casual'

interface Event {
	id: number
	eventType: string
	eventSubType: string
	reporter: string
	lastUpdatedBy: string
	status: string
	eventDate: string
	recordedDate: string
	location: string
}

interface FakeReduxState {
	events: Event[]
}

export const generateFakeReduxState = (): FakeReduxState => {
	const events: Event[] = []
	for (let i = 1; i <= 25; i++) {
		const eventType = casual.random_element(['Accident', 'Fire', 'Theft', 'Medical Emergency'])
		const eventSubType = casual.random_element(['Car Crash', 'House Fire', 'Robbery', 'Heart Attack'])
		const reporter = casual.name
		const lastUpdatedBy = casual.name
		const status = casual.random_element(['Open', 'Closed', 'In Progress'])
		const eventDate = casual.date('YYYY-MM-DD HH:mm:ss')
		const recordedDate = casual.date('YYYY-MM-DD HH:mm:ss')
		const location = `${casual.street},${casual.city},${casual.state},${casual.country}`
		events.push({
			id: i,
			eventType,
			eventSubType,
			reporter,
			lastUpdatedBy,
			status,
			eventDate,
			recordedDate,
			location,
		})
	}
	return { events }
}
