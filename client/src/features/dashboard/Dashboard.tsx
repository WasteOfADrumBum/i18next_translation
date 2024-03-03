import React from 'react'
import { Container, Typography } from '@mui/material'
import translations from '../../i18n/locales'
import { DynamicDataTable } from '../../components'
import { generateFakeReduxState } from '../../utils/FakeReduxEvent'

const dashboardTranslations = translations.pages.dashboard

const Dashboard: React.FC = () => {
	// Generate fake Redux state
	const fakeReduxState = generateFakeReduxState()

	// Extract events and columns from fake Redux state
	const { events } = fakeReduxState
	const columns = [
		{ id: 'id', label: dashboardTranslations.id },
		{ id: 'eventDate', label: dashboardTranslations.eventDate },
		{ id: 'eventType', label: dashboardTranslations.eventType },
		{ id: 'eventSubType', label: dashboardTranslations.eventSubtype },
		{ id: 'location', label: dashboardTranslations.location },
		{ id: 'reporter', label: dashboardTranslations.reporter },
		{ id: 'recordedDate', label: dashboardTranslations.recordedDate },
		{ id: 'lastUpdatedBy', label: dashboardTranslations.lastUpdatedBy },
		{ id: 'status', label: dashboardTranslations.status },
	]

	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				{dashboardTranslations.title}
			</Typography>
			<DynamicDataTable
				data={events}
				columns={columns}
				rowsPerPageOptions={[5, 10, 25]}
				pagination={{ rowsPerPage: 5 }}
				page={0}
				onPageChange={(newPage) => console.log('Page changed to:', newPage)}
				onRowsPerPageChange={(newRowsPerPage) => console.log('Rows per page changed to:', newRowsPerPage)}
			/>
		</Container>
	)
}

export default Dashboard
