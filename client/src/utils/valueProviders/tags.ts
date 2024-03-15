type Tags = {
	[key: string]: {
		[subtype: string]: string[]
	}
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
