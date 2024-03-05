// ThemeContextProvider.tsx
import React, { FC, createContext, useState } from 'react'

export const ThemeContext = createContext<boolean>(true)

interface ThemeContextProviderProps {
	children: React.ReactNode
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
	const [darkMode, setDarkMode] = useState<boolean>(true)

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	return <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>
}
