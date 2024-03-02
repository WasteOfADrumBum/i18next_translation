import React from 'react'
import { Container, Typography } from '@mui/material'
import translations from '../../i18n/locales'

const dashboardTranslations = translations.pages.dashboard

const Dashboard: React.FC = () => {
	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				{dashboardTranslations.title}
			</Typography>
			<Typography variant='body1' gutterBottom>
				Welcome to your dashboard.
			</Typography>
			{/* Add dashboard content here */}
		</Container>
	)
}

export default Dashboard
