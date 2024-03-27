import React, { createContext, Dispatch, FC, SetStateAction, useState } from 'react'

// Define the interface for the theme context value
interface ThemeContextValue {
	darkMode: boolean
	setDarkMode: Dispatch<SetStateAction<boolean>>
}

// Define the initial theme value
const initialThemeValue: ThemeContextValue = {
	darkMode: true,
	setDarkMode: () => {
		throw new Error('setDarkMode must be overridden')
	}, // This should be initialized with an actual function
}

// Create context with a default value
export const ThemeContext = createContext<ThemeContextValue>(initialThemeValue)

// Define the props interface for ThemeContextProvider
interface ThemeContextProviderProps {
	children: React.ReactNode
}

// Define the ThemeContextProvider component
export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
	// Initialize state for dark mode
	const [darkMode, setDarkMode] = useState<boolean>(initialThemeValue.darkMode)

	// Define the function to toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prevDarkMode) => !prevDarkMode)
	}

	// Create the context value
	const contextValue: ThemeContextValue = {
		darkMode,
		setDarkMode: toggleDarkMode, // Assign the toggleDarkMode function here
	}

	// Return the ThemeContextProvider with the provided context value
	return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
