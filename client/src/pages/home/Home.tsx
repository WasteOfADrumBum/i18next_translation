import { Box, Button, Container, ThemeProvider, Typography } from '@mui/material'
import React, { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { darkTheme, lightTheme } from '../../styles/theme'

const Home: FC = () => {
	const darkMode = useContext(ThemeContext)
	const theme = darkMode ? darkTheme : lightTheme
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate('/login')
	}

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='md'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						minHeight: 'calc(100vh - 128px)',
						marginTop: '2rem',
						marginBottom: '2rem',
					}}>
					<Typography variant='h1' component='h1' gutterBottom>
						Welcome to our Content Management System
					</Typography>
					<Typography variant='body1' component='p' gutterBottom>
						This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application with Redux for state management
						and Docker support.
					</Typography>
					<Typography variant='body2' component='p' gutterBottom>
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
