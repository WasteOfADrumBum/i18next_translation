type EventSubTypes = {
	[key: string]: string[]
}

export const eventSubTypes: EventSubTypes = {
	'Accident': ['Car Crash', 'Slip and Fall', 'Workplace Accident', 'Sports Injury'],
	'Crime': ['Theft', 'Assault', 'Burglary', 'Vandalism'],
	'Death': ['Suicide', 'Homicide', 'Accidental Death', 'Natural Death'],
	'Natural Disaster': ['Earthquake', 'Flood', 'Hurricane', 'Wildfire'],
	'Health Emergency': ['COVID-19 Outbreak', 'Epidemic/Pandemic', 'Biological Hazard', 'Chemical Spill'],
	'Other': ['Miscellaneous', 'Unknown', 'Not Applicable'],
}
