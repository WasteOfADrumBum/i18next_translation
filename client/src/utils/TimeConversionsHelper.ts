import translations from '../i18n/locales'

const errorTranslations = translations.errors

const TimeConversionsHelper = {
	convertTime: (input: any, format: string, includeTime: boolean, timeZone: string): string => {
		const date = new Date(input)

		if (isNaN(date.getTime())) {
			throw new Error(errorTranslations.invalidDateInput)
		}

		const options: Intl.DateTimeFormatOptions = {
			timeZone,
			hour12: !format.includes('HH'), // 12-hour format if 'HH' is not present
		}

		let formattedDate = ''

		if (format.includes('MM')) {
			const month = date.getMonth() + 1
			formattedDate += month.toString().padStart(2, '0') + '/'
		}

		if (format.includes('DD')) {
			const day = date.getDate()
			formattedDate += day.toString().padStart(2, '0') + '/'
		}

		if (format.includes('YYYY')) {
			const year = date.getFullYear()
			formattedDate += year
		}

		if (includeTime) {
			formattedDate += ' '

			if (format.includes('hh')) {
				const hours12 = date.getHours() % 12 || 12 // Convert 24-hour to 12-hour format
				formattedDate += hours12.toString().padStart(2, '0') + ':'
			}

			if (format.includes('HH')) {
				const hours24 = date.getHours()
				formattedDate += hours24.toString().padStart(2, '0') + ':'
			}

			if (format.includes('mm')) {
				const minutes = date.getMinutes()
				formattedDate += minutes.toString().padStart(2, '0')
			}

			if (format.includes('ss')) {
				const seconds = date.getSeconds()
				formattedDate += ':' + seconds.toString().padStart(2, '0')
			}
		}

		return formattedDate.trim()
	},
}

export default TimeConversionsHelper
