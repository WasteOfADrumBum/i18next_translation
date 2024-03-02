import React from 'react'
import { Container, Typography } from '@mui/material'

const Dashboard: React.FC = () => {
	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				Dashboard
			</Typography>
			<Typography variant='body1' gutterBottom>
				Welcome to your dashboard.
			</Typography>
			{/* Add dashboard content here */}
		</Container>
	)
}

export default Dashboard
