import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../features'

const Header: React.FC = () => {
	const location = useLocation()
	const { isAuthenticated, logout } = useAuth()

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Your Website Name
				</Typography>
				{isAuthenticated ? (
					<>
						{location.pathname !== '/dashboard' && (
							<Button component={Link} to='/dashboard' color='inherit'>
								Dashboard
							</Button>
						)}
						<Button onClick={logout} color='inherit'>
							Logout
						</Button>
					</>
				) : (
					<>
						{location.pathname !== '/login' && (
							<Button component={Link} to='/login' color='inherit'>
								Login
							</Button>
						)}
					</>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Header
