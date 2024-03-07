import translations from '../i18n/locales'

const errorTranslations = translations.errors

const TimeConversionsHelper = {
	convertTime: (input: string | number, format: string, includeTime: boolean, timeZone: string): string => {
		const date = new Date(input)

		if (isNaN(date.getTime())) {
			throw new Error(errorTranslations.invalidDateInput)
		}

		let formattedDate = ''
		const options: Intl.DateTimeFormatOptions = {
			timeZone: timeZone,
			year: 'numeric',
			month: format.includes('MM') ? '2-digit' : undefined,
			day: format.includes('DD') ? '2-digit' : undefined,
			hour: format.includes('hh') || format.includes('HH') ? '2-digit' : undefined,
			minute: format.includes('mm') ? '2-digit' : undefined,
			second: format.includes('ss') ? '2-digit' : undefined,
			hour12: format.includes('hh'),
		}

		formattedDate = date.toLocaleString(undefined, options)

		return formattedDate.trim()
	},
}

export default TimeConversionsHelper
