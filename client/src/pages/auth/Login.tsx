import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Login: FC = () => {
	const { t } = useTranslation()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		// Perform login logic here using username and password
		console.log('Username:', username)
		console.log('Password:', password)
	}

	const handleForgotPassword = () => {
		// Perform forgot password logic here
		console.log('Forgot password')
	}

	const handleRegister = () => {
		// Perform register logic here
		console.log('Register')
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
						{t('common.buttons.login')}
					</Typography>
					<TextField
						label={t('pages.user.username')}
						variant='outlined'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
						margin='normal'
					/>
					<TextField
						label={t('pages.user.password')}
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
						{t('common.buttons.login')}
					</Button>
					<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', alignItems: 'center' }}>
						<Button variant='text' color='primary' onClick={handleForgotPassword}>
							{t('common.buttons.forgotPassword')}
						</Button>
						<Typography sx={{ marginX: '0.5rem' }}>|</Typography>
						<Button variant='text' color='primary' onClick={handleRegister}>
							{t('common.buttons.register')}
						</Button>
					</Box>
				</Paper>
			</Box>
		</Container>
	)
}

export default Login
