import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define types for authentication state and context
interface AuthState {
	isAuthenticated: boolean
	login: () => void
	logout: () => void // Define logout function
}

// Create context for authentication
const AuthContext = createContext<AuthState | undefined>(undefined)

// Custom hook to consume AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

// AuthProvider component to provide authentication state and methods
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = () => {
		// Perform login logic here
		// For demonstration, simply set isAuthenticated to true
		setIsAuthenticated(true)
	}

	const logout = () => {
		// Perform logout logic here
		// For demonstration, simply set isAuthenticated to false
		setIsAuthenticated(false)
	}

	const value = {
		isAuthenticated,
		login,
		logout, // Include logout function in context value
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
