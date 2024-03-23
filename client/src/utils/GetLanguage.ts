import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GetLanguage = () => {
	const { i18n } = useTranslation()
	const [language, setLanguage] = useState<'en' | 'es'>(i18n.language as 'en' | 'es') // Define type here

	useEffect(() => {
		setLanguage(i18n.language as 'en' | 'es') // Update type here
	}, [i18n.language])

	return language
}
