import React, { useState, useEffect, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from './features/auth/AuthProvider'
import {
	Home,
	About,
	Login,
	Dashboard,
	NotFound,
	UserListView,
	UserInputForm,
	UserDetailsView,
	EventDetailsView,
	EventInputForm,
} from './features'
import { lightTheme, darkTheme } from './styles/theme'
import { NavBar, Header, Footer, TabsComponent } from './components'
import { CssBaseline } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from './store/actions/userActions'

// Create a Theme Context
export const ThemeContext = createContext<any>(null)
export const HeaderContext = createContext<any>(null)

function PrivateRoute({ element, isAuthenticated }: { element: React.ReactNode; isAuthenticated: boolean }) {
	return isAuthenticated ? element : <Navigate to='/login' />
}

function App() {
	useEffect(() => {
		console.log('%cApp Loaded', 'color: green; font-size: 24px;')
	}, [])

	const [darkMode, setDarkMode] = useState<boolean>(true)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
	const [headerData, setHeaderData] = useState<any>({
		header: 'React MUI Template',
		subheader: 'A template for building React applications with Material-UI',
		extraContent: null,
	})
	const dispatch = useDispatch()

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	useEffect(() => {
		// Log darkMode state and toggleDarkMode function
		const logStyle = darkMode ? 'background: black; color: white' : 'background: white; color: black'
		const mode = darkMode ? 'Dark' : 'Light'
		console.log('%cTheme State (App):', logStyle, mode)
	}, [darkMode])

	useEffect(() => {
		// Log isAuthenticated state and user
		if (isAuthenticated) {
			console.log('Authenticated State (App):', isAuthenticated, fakeUser)
		} else {
			console.log('Authenticated State (App):', isAuthenticated)
		}
	}, [isAuthenticated])

	const fakeUser = {
		name: 'John M. Doe',
		role: 'Admin',
	}

	const handleLoginToggle = (newState: boolean) => {
		setIsAuthenticated(newState) // Update the authentication state

		if (newState) {
			dispatch(setUser(fakeUser)) // Dispatch the action with the fake user object
		} else {
			dispatch(clearUser()) // Dispatch the action to clear the user state
		}
	}

	const tabs = [{ label: 'Details', route: '/', element: <EventDetailsView /> }]

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<AuthProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<CssBaseline />
					<Router>
						<HeaderContext.Provider value={{ headerData, setHeaderData }}>
							<NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLoginToggle={handleLoginToggle} />
							<div style={{ minHeight: '100vh', marginTop: '64px', marginBottom: '64px' }}>
								{isAuthenticated && (
									<Header
										header={headerData.header}
										subHeader={headerData.subheader}
										user={{ name: 'John Doe', role: 'Admin' }}>
										{headerData.extraContent && <headerData.extraContent />}
									</Header>
								)}
								<Routes>
									<Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Home />} />
									<Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
									<Route path='/about' element={<About />} />
									{/* Private Routes */}
									<Route
										path='/dashboard'
										element={<PrivateRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />}
									/>
									<Route
										path='/dashboard/event/${eventId}/*'
										element={
											<PrivateRoute
												isAuthenticated={isAuthenticated}
												element={
													<TabsComponent isAuthenticated={isAuthenticated} tabs={tabs}>
														<Route path='/details' element={<EventDetailsView />} />
													</TabsComponent>
												}
											/>
										}
									/>
									<Route
										path='/event/new'
										element={<PrivateRoute element={<EventInputForm />} isAuthenticated={isAuthenticated} />}
									/>
									<Route
										path='/event/edit/:id'
										element={<PrivateRoute element={<EventInputForm />} isAuthenticated={isAuthenticated} />}
									/>
									<Route
										path='/event/:id'
										element={<PrivateRoute element={<EventDetailsView />} isAuthenticated={isAuthenticated} />}
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
						</HeaderContext.Provider>
					</Router>
				</ThemeProvider>
			</AuthProvider>
		</ThemeContext.Provider>
	)
}

export default App
