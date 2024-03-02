import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Home, About, Login, useAuth, Dashboard } from './features'

// PrivateRoute component for rendering private routes
const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
	const { isAuthenticated } = useAuth() // Assume useAuth() returns the authentication state
	return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to='/login' />
}

// PublicRoute component for rendering public routes
const PublicRoute: React.FC<{ path: string; element: React.ReactNode }> = ({ path, element }) => {
	const { isAuthenticated } = useAuth() // Assume useAuth() returns the authentication state
	return isAuthenticated ? <Navigate to='/' /> : <Route path={path} element={element} />
}

function App() {
	return (
		<Router>
			<Routes>
				{/* Public routes */}
				<PublicRoute path='/login' element={<Login />} />
				<PublicRoute path='/' element={<Home />} />
				<PublicRoute path='/about' element={<About />} />
				{/* Private routes */}
				<PrivateRoute path='/dashboard' element={<Dashboard />} />
			</Routes>
		</Router>
	)
}

export default App
