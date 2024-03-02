import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { Home, About, Login, Dashboard, NotFound, UserListView, UserInputForm, UserDetailsView } from './features'
import { lightTheme, darkTheme } from './styles/theme'
import { Footer, Header } from './components'

// Create a Theme Context
export const ThemeContext = React.createContext<any>(null)

function PrivateRoute({ element, isAuthenticated }: { element: React.ReactNode; isAuthenticated: boolean }) {
	return isAuthenticated ? element : <Navigate to='/login' />
}

function App() {
	useEffect(() => {
		console.log('%cApp Loaded', 'color: green; font-size: 24px;')
	}, [])

	const [darkMode, setDarkMode] = useState<boolean>(true)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false) // State to manage authentication

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	useEffect(() => {
		// Log darkMode state and toggleDarkMode function
		console.log('Dark Mode State (App):', darkMode)
	}, [darkMode])

	useEffect(() => {
		// Log isAuthenticated state and handleLoginToggle function
		console.log('Authenticated State (App):', isAuthenticated)
	}, [isAuthenticated])

	const handleLoginToggle = (newState: boolean) => {
		setIsAuthenticated(newState) // Update the authentication state
	}

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<AuthProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<Router>
						<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLoginToggle={handleLoginToggle} />{' '}
						{/* Pass darkMode and toggleDarkMode */}
						{/* Apply margin-top to prevent content overlap Adjust according to header height */}
						<div style={{ marginTop: '64px' }}>
							<Routes>
								<Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Home />} />
								<Route path='/login' element={<Login />} />
								<Route path='/about' element={<About />} />
								{/* Private Routes */}
								<Route
									path='/dashboard'
									element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
								/>
								<Route
									path='/users'
									element={<PrivateRoute element={<UserListView />} isAuthenticated={isAuthenticated} />}
								/>
								<Route
									path='/users/new'
									element={<PrivateRoute element={<UserInputForm />} isAuthenticated={isAuthenticated} />}
								/>
								<Route
									path='/users/edit/:id'
									element={<PrivateRoute element={<UserInputForm />} isAuthenticated={isAuthenticated} />}
								/>
								<Route
									path='/users/:id'
									element={<PrivateRoute element={<UserDetailsView />} isAuthenticated={isAuthenticated} />}
								/>
								{/* Catch-all route for 404 */}
								<Route path='*' element={<NotFound />} />
							</Routes>
						</div>
						<Footer />
					</Router>
				</ThemeProvider>
			</AuthProvider>
		</ThemeContext.Provider>
	)
}

export default App
