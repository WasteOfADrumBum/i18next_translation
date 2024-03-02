import React, { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { Home, About, Login, Dashboard, NotFound, UserListView, UserInputForm, UserDetailsView } from './features'
import { lightTheme, darkTheme } from './styles/theme'
import { Footer, Header, ThemeSwitcher } from './components'

// Create a Theme Context
export const ThemeContext = createContext<any>(null)

function PrivateRoute({ element }: { element: React.ReactNode }) {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? element : <Navigate to='/login' />
}

function App() {
	useEffect(() => {
		console.log('%cApp Loaded', 'color: green; font-size: 24px;')
	}, [])

	const [darkMode, setDarkMode] = useState<boolean>(false)

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode)
	}

	useEffect(() => {
		// Log darkMode state and toggleDarkMode function
		console.log('Dark Mode State (App):', darkMode)
	}, [darkMode])

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<AuthProvider>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					<Router>
						<Header />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/about' element={<About />} />
							{/* Private Routes */}
							<Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
							<Route path='/users' element={<PrivateRoute element={<UserListView />} />} />
							<Route path='/users/new' element={<PrivateRoute element={<UserInputForm />} />} />
							<Route path='/users/edit/:id' element={<PrivateRoute element={<UserInputForm />} />} />
							<Route path='/users/:id' element={<PrivateRoute element={<UserDetailsView />} />} />
							{/* Catch-all route for 404 */}
							<Route path='*' element={<NotFound />} />
						</Routes>
						<Footer />
					</Router>
					<ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
				</ThemeProvider>
			</AuthProvider>
		</ThemeContext.Provider>
	)
}

export default App
