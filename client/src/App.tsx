import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from './features/auth/AuthProvider'
import { Home, About, Login, Dashboard, NotFound, UserListView, UserInputForm, UserDetailsView } from './features'
import { lightTheme, darkTheme } from './styles/theme'
import { Header, Footer, TabsComponent } from './components'
import { CssBaseline } from '@mui/material'

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

	const tabs = [
		{ label: 'Dashboard', route: '/', element: <Dashboard /> },
		{ label: 'Users', route: '/users', element: <UserListView /> },
	]

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<AuthProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<CssBaseline />
					<Router>
						<Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLoginToggle={handleLoginToggle} />
						<div style={{ minHeight: '100vh', marginTop: '64px', marginBottom: '64px' }}>
							<Routes>
								<Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Home />} />
								<Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
								<Route path='/about' element={<About />} />
								{/* Private Routes */}
								<Route
									path='/dashboard/*'
									element={
										<PrivateRoute
											isAuthenticated={isAuthenticated}
											element={
												<TabsComponent isAuthenticated={isAuthenticated} tabs={tabs}>
													<Route path='/' element={<Dashboard />} />
													<Route path='/users' element={<UserListView />} />
												</TabsComponent>
											}
										/>
									}
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
