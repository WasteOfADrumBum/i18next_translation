import React, { FC } from 'react'
import { Switch, FormControlLabel } from '@mui/material'

interface ThemeSwitcherProps {
	darkMode: boolean
	toggleDarkMode: () => void
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
	return (
		<FormControlLabel
			control={<Switch checked={darkMode} onChange={toggleDarkMode} color='primary' />}
			label={darkMode ? 'Dark Mode' : 'Light Mode'}
		/>
	)
}

export default ThemeSwitcher
