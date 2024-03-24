interface TimeConversionsHelper {
	convertTime: (
		t: (key: string) => string,
		input: Date | string | number,
		format: string,
		includeTime: boolean,
		timeZone: string,
	) => string
}

export const TimeConversionsHelper: TimeConversionsHelper = {
	convertTime: (t, input, format, includeTime, timeZone): string => {
		let date: Date

		// If input is a string or a number, convert it to a Date object
		if (typeof input === 'string' || typeof input === 'number') {
			date = new Date(input)
		} else {
			date = input
		}

		if (isNaN(date.getTime())) {
			throw new Error(t('errors:invalidDateInput'))
		}

		let formattedDate = ''
		const options: Intl.DateTimeFormatOptions = {
			timeZone: timeZone,
			year: 'numeric',
			month: format.includes('MM') ? '2-digit' : undefined,
			day: format.includes('DD') ? '2-digit' : undefined,
			hour: includeTime && (format.includes('hh') || format.includes('HH')) ? '2-digit' : undefined,
			minute: includeTime && format.includes('mm') ? '2-digit' : undefined,
			second: includeTime && format.includes('ss') ? '2-digit' : undefined,
			hour12: includeTime && format.includes('hh'),
		}

		formattedDate = date.toLocaleString(undefined, options)

		return formattedDate.trim()
	},
}
