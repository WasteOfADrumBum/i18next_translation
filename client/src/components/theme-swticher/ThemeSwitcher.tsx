import React from 'react'

interface ThemeSwitcherProps {
	darkMode: boolean
	toggleDarkMode: () => void
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ darkMode, toggleDarkMode }) => {
	return (
		<div>
			<button onClick={toggleDarkMode}>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>
		</div>
	)
}

export default ThemeSwitcher
