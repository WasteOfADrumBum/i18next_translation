type EventSubTypes = {
	[key: string]: string[]
}

type Tags = {
	[key: string]: {
		[subtype: string]: string[]
	}
}

export const eventTypes = ['Accident', 'Crime', 'Death', 'Natural Disaster', 'Health Emergency', 'Other']

export const eventSubTypes: EventSubTypes = {
	'Accident': ['Car Crash', 'Slip and Fall', 'Workplace Accident', 'Sports Injury'],
	'Crime': ['Theft', 'Assault', 'Burglary', 'Vandalism'],
	'Death': ['Suicide', 'Homicide', 'Accidental Death', 'Natural Death'],
	'Natural Disaster': ['Earthquake', 'Flood', 'Hurricane', 'Wildfire'],
	'Health Emergency': ['COVID-19 Outbreak', 'Epidemic/Pandemic', 'Biological Hazard', 'Chemical Spill'],
	'Other': ['Miscellaneous', 'Unknown', 'Not Applicable'],
}

export const tags: Tags = {
	'Accident': {
		'Car Crash': ['Car Accident', 'Traffic', 'Vehicle'],
		'Slip and Fall': ['Injury', 'Accident', 'Fall'],
		'Workplace Accident': ['Workplace', 'Injury', 'Accident'],
		'Sports Injury': ['Sports', 'Injury', 'Accident'],
	},
	'Crime': {
		Theft: ['Theft', 'Property Crime', 'Stolen'],
		Assault: ['Assault', 'Violence', 'Attack'],
		Burglary: ['Burglary', 'Break-in', 'Robbery'],
		Vandalism: ['Vandalism', 'Damage', 'Property Crime'],
	},
	'Death': {
		'Suicide': ['Suicide', 'Mental Health', 'Self-harm'],
		'Homicide': ['Homicide', 'Murder', 'Crime'],
		'Accidental Death': ['Accidental Death', 'Unintentional', 'Fatal'],
		'Natural Death': ['Natural Death', 'Passing Away', 'Death'],
	},
	'Natural Disaster': {
		Earthquake: ['Earthquake', 'Seismic', 'Disaster'],
		Flood: ['Flood', 'Flooding', 'Water Damage'],
		Hurricane: ['Hurricane', 'Storm', 'Weather'],
		Wildfire: ['Wildfire', 'Forest Fire', 'Fire'],
	},
	'Health Emergency': {
		'COVID-19 Outbreak': ['COVID-19', 'Pandemic', 'Health Crisis'],
		'Epidemic/Pandemic': ['Epidemic', 'Pandemic', 'Health Crisis'],
		'Biological Hazard': ['Biological Hazard', 'Health Emergency', 'Outbreak'],
		'Chemical Spill': ['Chemical Spill', 'Hazardous Material', 'Environmental'],
	},
	'Other': {
		'Miscellaneous': ['Miscellaneous', 'Other', 'General'],
		'Unknown': ['Unknown', 'Unidentified', 'Mystery'],
		'Not Applicable': ['Not Applicable', 'N/A', 'None'],
	},
}

export const getEventTypes = (t: (key: string) => string) => {
	const translatedEventTypes = eventTypes.map((eventType) => ({
		key: eventType,
		value: t(`values.events.eventTypes.${eventType}`),
	}))

	return translatedEventTypes
}

export const getEventSubTypes = (t: (key: string) => string) => {
	const translatedEventSubTypes: EventSubTypes = {}

	for (const eventType in eventSubTypes) {
		translatedEventSubTypes[eventType] = eventSubTypes[eventType].map((subtype) =>
			t(`values.events.eventSubTypes.${eventType}.${subtype}`),
		)
	}

	return translatedEventSubTypes
}

export const getTags = (t: (key: string) => string) => {
	const translatedTags: Tags = {}

	for (const eventType in tags) {
		translatedTags[eventType] = {}

		for (const subtype in tags[eventType]) {
			translatedTags[eventType][subtype] = tags[eventType][subtype].map((tag) =>
				t(`values.events.tags.${eventType}.${subtype}.${tag}`),
			)
		}
	}

	return translatedTags
}
