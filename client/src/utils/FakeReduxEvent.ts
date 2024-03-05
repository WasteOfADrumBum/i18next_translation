import faker from 'faker'

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
		const eventType = faker.random.arrayElement(['Accident', 'Fire', 'Theft', 'Medical Emergency'])
		const eventSubType = faker.random.arrayElement(['Car Crash', 'House Fire', 'Robbery', 'Heart Attack'])
		const reporter = faker.name.findName()
		const lastUpdatedBy = faker.name.findName()
		const status = faker.random.arrayElement(['Open', 'Closed', 'In Progress'])
		const eventDate = new Date(faker.date.past()).toLocaleString()
		const recordedDate = new Date(faker.date.recent()).toLocaleString()
		const location = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()}, ${faker.address.country()}`
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
