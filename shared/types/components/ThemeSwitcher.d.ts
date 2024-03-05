import React, { FC } from 'react'

interface ThemeSwitcherProps {
	darkMode: boolean
	toggleDarkMode: () => void
}

declare const ThemeSwitcher: FC<ThemeSwitcherProps>

export default ThemeSwitcher
