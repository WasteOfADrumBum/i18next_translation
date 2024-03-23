import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
	}

	/*
	 * "english": "English",
	 * "spanish": "Español",
	 * "french": "Français",
	 * "german": "Deutsch",
	 * "japanese": "日本語",
	 * "chinese": "中文"
	 */

	return (
		<Select value={i18n.language} onChange={(event) => changeLanguage(event.target.value)}>
			<MenuItem value={'en'}>English</MenuItem>
			<MenuItem value={'es'}>Español</MenuItem>
			<MenuItem value={'fr'}>Français</MenuItem>
			<MenuItem value={'de'}>Deutsch</MenuItem>
			<MenuItem value={'ja'}>日本語</MenuItem>
			<MenuItem value={'zh'}>中文</MenuItem>
		</Select>
	)
}

export default LanguageSwitcher
