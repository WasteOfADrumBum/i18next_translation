import { useTranslation } from 'react-i18next'

interface TimeConversionsHelper {
	convertTime: (input: Date | string | number, format: string, includeTime: boolean, timeZone: string) => string
}

export const TimeConversionsHelper: TimeConversionsHelper = {
	convertTime: (input: Date | string | number, format: string, includeTime: boolean, timeZone: string): string => {
		const { t } = useTranslation()
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
			hour: format.includes('hh') || format.includes('HH') ? '2-digit' : undefined,
			minute: format.includes('mm') ? '2-digit' : undefined,
			second: format.includes('ss') ? '2-digit' : undefined,
			hour12: format.includes('hh'),
		}

		formattedDate = date.toLocaleString(undefined, options)

		return formattedDate.trim()
	},
}
