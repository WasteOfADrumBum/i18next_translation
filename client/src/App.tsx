import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { Home, About, Login, Dashboard } from './features'

function PrivateRoute({ path, element }: { path: string; element: ReactNode }) {
	const { isAuthenticated } = useAuth()

	// If user is authenticated, render the provided element
	// Otherwise, redirect the user to the login page
	return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to='/login' />
}

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Public Routes */}
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/about' element={<About />} />

					{/* Private Route */}
					<Route path='/dashboard' element={<PrivateRoute path='/dashboard' element={<Dashboard />} />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
