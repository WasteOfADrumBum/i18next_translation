// Home.tsx
import React from 'react'
import { Container, Typography, Button } from '@mui/material'

const Home: React.FC = () => {
	return (
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
	)
}

export default Home
