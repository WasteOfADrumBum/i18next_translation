import React, { useContext, useEffect } from 'react'
import { Container } from '@mui/material'
import translations from '../../i18n/locales'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { generateFakeReduxState } from '../../utils/FakeReduxEvent'
import TimeConversionsHelper from '../../utils/TimeConversionsHelper'
import { HeaderContext } from '../../App'

const dashboardTranslations = translations.pages.events

const Dashboard: React.FC = () => {
	const { setHeaderData } = useContext(HeaderContext)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: dashboardTranslations.title,
			subheader: 'List of your event records',
			extraContent: () => <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
			})
		}
	}, [setHeaderData])

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
		{
			id: 'actions',
			label: dashboardTranslations.actions,
			render: (rowData: any) => (
				<ActionsMenu
					onView={() => handleView(rowData)}
					onEdit={() => handleEdit(rowData)}
					onDelete={() => handleDelete(rowData)}
				/>
			),
		},
	]

	// Format date/time values in events
	const formattedEvents = events.map((event) => ({
		...event,
		eventDate: TimeConversionsHelper.convertTime(event.eventDate, 'MM/DD/YYYY HH:mm', true, 'America/New_York'),
		recordedDate: TimeConversionsHelper.convertTime(event.recordedDate, 'MM/DD/YYYY HH:mm', true, 'America/New_York'),
	}))

	// Define handleView function
	const handleView = (rowData: any) => {
		console.log('View action for row:', rowData)
		// TODO: Implement view action
	}

	// Define handleEdit function
	const handleEdit = (rowData: any) => {
		console.log('Edit action for row:', rowData)
		// TODO: Implement edit action
	}

	// Define handleDelete function
	const handleDelete = (rowData: any) => {
		console.log('Delete action for row:', rowData)
		// TODO: Implement delete action
	}

	return (
		<Container maxWidth='xl'>
			<DynamicDataTable
				data={formattedEvents}
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