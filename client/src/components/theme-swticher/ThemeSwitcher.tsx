import { FormControlLabel, Switch } from '@mui/material'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ThemeSwitcherProps {
	darkMode: boolean
	toggleDarkMode: () => void
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
	const { t } = useTranslation()
	return (
		<FormControlLabel
			control={<Switch checked={darkMode} onChange={toggleDarkMode} color='primary' />}
			label={
				darkMode ? (
					<>
						{t('common.settings.dark')} {t('common.settings.theme')}
					</>
				) : (
					<>
						{t('common.settings.light')} {t('common.settings.theme')}
					</>
				)
			}
		/>
	)
}

export default ThemeSwitcher
