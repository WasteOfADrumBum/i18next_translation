import React, { useContext } from 'react'
import { Container, Typography, Button, ThemeProvider, Box } from '@mui/material'
import { lightTheme, darkTheme } from '../../styles/theme'
import { ThemeContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
	const { darkMode } = useContext(ThemeContext)
	const theme = darkMode ? darkTheme : lightTheme
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate('/login')
	}

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='md'>
				<Box sx={{ py: 8, textAlign: 'center' }}>
					<Typography variant='h1' component='h1' gutterBottom>
						Welcome to our Content Management System
					</Typography>
					<Typography variant='caption' component='p' gutterBottom>
						This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application with Redux for state management
						and Docker support.
					</Typography>
					<Typography variant='body1' component='p' gutterBottom>
						This is the home page of my application. To access the secure content management system, please log in and
						authenticate using your credentials.
					</Typography>
					<Button variant='contained' color='primary' sx={{ mt: 4 }} onClick={handleLoginClick}>
						Login
					</Button>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Home
