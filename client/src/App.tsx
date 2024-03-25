// App.tsx
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React, { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Footer, Header, NavBar, TabsComponent } from './components'
import {
	About,
	EntityDetailsView,
	EntityInputForm,
	EntityListView,
	EventDetailsView,
	EventInputForm,
	EventListView,
	Home,
	Login,
	NotFound,
	UserDetailsView,
	UserInputForm,
	UserListView,
	VehicleDetailsView,
	VehicleInputForm,
	VehicleListView,
} from './pages'
import { AuthProvider } from './pages/auth/AuthProvider'
import { clearUser, setUser } from './store/actions/mongodb/userActions'
import { darkTheme, lightTheme } from './styles/theme'

function PrivateRoute({ element, isAuthenticated }: { element: ReactNode; isAuthenticated: boolean }) {
	return isAuthenticated ? element : <Navigate to='/login' />
}

function App() {
	useEffect(() => {
		console.log('%cApp Loaded', 'color: green; font-size: 24px;')
	}, [])

	const { t } = useTranslation()
	const [darkMode, setDarkMode] = useState<boolean>(true)
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
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

	const fakeUser: { name: string; role: string } = {
		name: 'John M. Doe',
		role: 'Admin',
	}

	useEffect(() => {
		// Log isAuthenticated state and user
		if (isAuthenticated) {
			console.log(
				'%cAuthenticated State (App): %c' +
					isAuthenticated +
					'\n' +
					'%c User Name: %c' +
					fakeUser.name +
					'%c Role: %c' +
					fakeUser.role,
				'color: Green;',
				'',
				'',
				'color: yellow;',
				'',
				'color: yellow;',
				'',
			)
		} else {
			console.log('%cAuthenticated State (App): %c' + isAuthenticated, 'color: red;', '')
		}
	}, [isAuthenticated, fakeUser.name, fakeUser.role])

	const handleLoginToggle = (newState: boolean) => {
		setIsAuthenticated(newState) // Update the authentication state

		if (newState) {
			dispatch(setUser(fakeUser)) // Dispatch the action with the fake user object
		} else {
			dispatch(clearUser()) // Dispatch the action to clear the user state
		}
	}

	const tabs = [
		{ label: t('pages.events.titles.details'), route: '/details', element: <EventDetailsView /> },
		{ label: t('pages.entities.pageTitle.singular'), route: '/entity', element: <EntityListView /> },
		{ label: t('pages.vehicles.pageTitle.singular'), route: '/vehicle', element: <VehicleListView /> },
	]

	return (
		<AuthProvider>
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<CssBaseline />
				<Router>
					<NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onLoginToggle={handleLoginToggle} />
					<div style={{ minHeight: '100vh', marginTop: '64px', marginBottom: '64px' }}>
						{isAuthenticated && <Header user={{ name: fakeUser.name, role: fakeUser.role }} />}
						<Routes>
							<Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Home />} />
							<Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
							<Route path='/about' element={<About />} />
							{/* Private Routes */}
							<Route
								path='/dashboard'
								element={<PrivateRoute element={<EventListView />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path={`/dashboard/event/:eventId/*`}
								element={
									<PrivateRoute
										isAuthenticated={isAuthenticated}
										element={
											<TabsComponent isAuthenticated={isAuthenticated} tabs={tabs} basePath={`/dashboard/event/`}>
												<Route path='/details' element={<EventDetailsView />} />
												<Route path='/entity' element={<EntityListView />} />
												<Route path='/vehicle' element={<VehicleListView />} />
											</TabsComponent>
										}
									/>
								}
							/>
							{/* Events */}
							<Route
								path='/event/create'
								element={<PrivateRoute element={<EventInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='/event/:eventId/edit'
								element={<PrivateRoute element={<EventInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='/event/:eventId'
								element={<PrivateRoute element={<EventDetailsView />} isAuthenticated={isAuthenticated} />}
							/>
							{/* Entities */}
							<Route
								path='dashboard/event/:eventId/entity/create'
								element={<PrivateRoute element={<EntityInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='dashboard/event/:eventId/entity/:entityId/edit'
								element={<PrivateRoute element={<EntityInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='dashboard/event/:eventId/entity/:entityId'
								element={<PrivateRoute element={<EntityDetailsView />} isAuthenticated={isAuthenticated} />}
							/>
							{/* Vehicles */}
							<Route
								path='dashboard/event/:eventId/vehicle/create'
								element={<PrivateRoute element={<VehicleInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='dashboard/event/:eventId/vehicle/:vehicleId/edit'
								element={<PrivateRoute element={<VehicleInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='dashboard/event/:eventId/vehicle/:vehicleId'
								element={<PrivateRoute element={<VehicleDetailsView />} isAuthenticated={isAuthenticated} />}
							/>
							{/* Users */}
							<Route
								path='/users'
								element={<PrivateRoute element={<UserListView />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='/users/create'
								element={<PrivateRoute element={<UserInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='/users/edit/:userId'
								element={<PrivateRoute element={<UserInputForm />} isAuthenticated={isAuthenticated} />}
							/>
							<Route
								path='/users/:userId'
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
	)
}

export default App
