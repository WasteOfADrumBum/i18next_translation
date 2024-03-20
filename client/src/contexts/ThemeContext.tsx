// ThemeContextProvider.tsx
import React, { createContext, FC, useState } from 'react'

export const ThemeContext = createContext<boolean>(true)

interface ThemeContextProviderProps {
	children: React.ReactNode
}

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
	const [darkMode, setDarkMode] = useState<boolean>(true)

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	return <ThemeContext.Provider value={darkMode}>{children}</ThemeContext.Provider>
}
