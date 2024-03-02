import React, { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { Home, About, Login, Dashboard } from './features'
import { lightTheme, darkTheme } from './styles/theme'
import { ThemeSwitcher } from './components'

// Create a Theme Context
export const ThemeContext = createContext<any>(null)

function PrivateRoute({ path, element }: { path: string; element: React.ReactNode }) {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to='/login' />
}

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(false)

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	console.log('%cApp Loaded', 'color: green; font-size: 24px;')

	// Log darkMode state and toggleDarkMode function
	console.log('Dark Mode State (App):', darkMode)

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<AuthProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<Router>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/about' element={<About />} />
							<Route path='/dashboard' element={<PrivateRoute path='/dashboard' element={<Dashboard />} />} />
						</Routes>
					</Router>
					<ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
				</ThemeProvider>
			</AuthProvider>
		</ThemeContext.Provider>
	)
}

export default App
