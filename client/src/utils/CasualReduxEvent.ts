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

const eventTypes = ['Accident', 'Fire', 'Theft', 'Medical Emergency']
const eventSubTypes = ['Car Crash', 'House Fire', 'Robbery', 'Heart Attack']
const statuses = ['Open', 'Closed', 'In Progress']

const generateFakeReduxState = (): FakeReduxState => {
	const events: Event[] = []
	for (let i = 1; i <= 25; i++) {
		const eventType = getRandomElement(eventTypes)
		const eventSubType = getRandomElement(eventSubTypes)
		const reporter = generateFakeName()
		const lastUpdatedBy = generateFakeName()
		const status = getRandomElement(statuses)
		const eventDate = generateFakeDate()
		const recordedDate = generateFakeDate()
		const location = generateFakeLocation()
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

const getRandomElement = (array: string[]): string => {
	return array[Math.floor(Math.random() * array.length)]
}

const generateFakeName = (): string => {
	const firstName = getRandomElement(['John', 'Jane', 'Michael', 'Emily', 'David'])
	const lastName = getRandomElement(['Doe', 'Smith', 'Johnson', 'Brown', 'Taylor'])
	return `${firstName} ${lastName}`
}

const generateFakeDate = (): string => {
	const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000)) // Random date within the last few months
	return date.toISOString()
}

const generateFakeLocation = (): string => {
	const street = getRandomElement(['123 Main St', '456 Elm St', '789 Oak St'])
	const city = getRandomElement(['New York', 'Los Angeles', 'Chicago'])
	const state = getRandomElement(['NY', 'CA', 'IL'])
	const country = 'USA'
	return `${street}, ${city}, ${state}, ${country}`
}

export { generateFakeReduxState }
