import React, { useContext } from 'react'
import { Container, Typography, Button, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from '../../styles/theme'
import { ThemeContext } from '../../App'

const Home: React.FC = () => {
	const { darkMode } = useContext(ThemeContext)
	// Get the theme object based on darkMode
	const theme = darkMode ? darkTheme : lightTheme

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Typography variant='h1' gutterBottom>
					Welcome to My App
				</Typography>
				<Typography variant='body1' gutterBottom>
					This is the home page of my application.
				</Typography>
				<Button variant='contained' color='primary'>
					Get Started
				</Button>
			</Container>
		</ThemeProvider>
	)
}

export default Home
