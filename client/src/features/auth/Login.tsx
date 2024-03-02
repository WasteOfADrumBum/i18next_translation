import React from 'react'
import { Container, Typography, Button } from '@mui/material'

const Login: React.FC = () => {
	// Dummy login function for demonstration
	const handleLogin = () => {
		// Perform login logic here
		console.log('Logged in')
	}

	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				Login
			</Typography>
			<Button variant='contained' color='primary' onClick={handleLogin}>
				Login
			</Button>
		</Container>
	)
}

export default Login
