declare module 'faker' {
	interface FakerStatic {
		random: {
			arrayElement: (array: any[]) => any
		}
		name: {
			findName: () => string
		}
		date: {
			past: () => Date
			recent: () => Date
		}
		address: {
			streetAddress: () => string
			city: () => string
			state: () => string
			country: () => string
			latitude: () => string
			longitude: () => string
		}
	}

	const faker: FakerStatic
	export = faker
}
