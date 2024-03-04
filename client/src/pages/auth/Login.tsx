import React, { useState } from 'react'
import { Container, Typography, Button, TextField, Box, Paper } from '@mui/material'

const Login: React.FC = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		// Perform login logic here using username and password
		console.log('Username:', username)
		console.log('Password:', password)
	}

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: 'calc(100vh - 128px)',
					marginTop: '2rem',
					marginBottom: '2rem',
				}}>
				<Paper elevation={3} sx={{ padding: '2rem', width: '300px' }}>
					<Typography variant='h4' align='center' gutterBottom>
						Login
					</Typography>
					<TextField
						label='Username'
						variant='outlined'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
						margin='normal'
					/>
					<TextField
						label='Password'
						variant='outlined'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						fullWidth
						margin='normal'
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={handleLogin}
						disabled={!username || !password} // Disable button if username or password is empty
						fullWidth
						sx={{ marginTop: '1rem' }}>
						Login
					</Button>
				</Paper>
			</Box>
		</Container>
	)
}

export default Login