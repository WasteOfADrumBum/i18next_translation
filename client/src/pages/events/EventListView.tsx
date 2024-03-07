import React, { useContext, useEffect, FC, useMemo, useState } from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import translations from '../../i18n/locales'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { generateFakeReduxState } from '../../utils/CasualReduxEvent'
import TimeConversionsHelper from '../../utils/TimeConversionsHelper'
import { HeaderContext } from '../../contexts/HeaderContext'
import { useNavigate } from 'react-router-dom'
import { AddCircleOutline } from '@mui/icons-material'

interface Event {
	id: string
	eventDate: string
	eventType: string
	eventSubType: string
	location: {
		address: string
		city: string
	}
	reporter: string
	recordedDate: string
	lastUpdatedBy: string
	lastUpdatedDate: string
	status: string
}

const eventHeaderTranslations = translations.pages.events.header
const eventTableTranslations = translations.pages.events.table.labels

const EventListView: FC = () => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const [formattedEvents, setFormattedEvents] = useState<any[]>([])

	useEffect(() => {
		// Generate fake Redux state
		const fakeReduxState = generateFakeReduxState()

		// Extract events and columns from fake Redux state
		const { events } = fakeReduxState

		// Format date/time values in events
		const formattedEvents = events.map((event: any) => ({
			...event,
			eventDate: TimeConversionsHelper.convertTime(event.eventDate, 'MM/DD/YYYY', true, 'America/New_York'),
			recordedDate: TimeConversionsHelper.convertTime(event.recordedDate, 'MM/DD/YYYY', true, 'America/New_York'),
		}))

		setFormattedEvents(formattedEvents)
	}, [])

	const stats = useMemo(() => {
		// Calculate statistics
		const totalRecords = formattedEvents.length
		const statusStats: Record<string, number> = {}
		formattedEvents.forEach((event) => {
			if (statusStats[event.status]) {
				statusStats[event.status]++
			} else {
				statusStats[event.status] = 1
			}
		})
		return { totalRecords, statusStats }
	}, [formattedEvents])

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: eventHeaderTranslations.title,
			subheader: eventHeaderTranslations.subtitle,
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={6}>
						<Typography variant='body2' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
							{eventHeaderTranslations.total}:
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='body2' sx={{ textAlign: 'right' }}>
							{stats.totalRecords}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='body2' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
							{eventHeaderTranslations.status}:
						</Typography>
						{Object.entries(stats.statusStats).map(([status, count]) => (
							<Grid container key={status} spacing={2}>
								<Grid item xs={6}>
									<Typography variant='body2' ml={2} sx={{ textAlign: 'left' }}>
										{status}:
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='body2' sx={{ textAlign: 'right' }}>
										{count}
									</Typography>
								</Grid>
							</Grid>
						))}
					</Grid>
				</Grid>
			),
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: '',
				subheader: '',
				extraContent: null,
			})
		}
	}, [setHeaderData, stats])

	// Define handleView function
	const handleView = (id: string) => {
		navigate(`/dashboard/event/${id}/details`)
	}

	// Define handleEdit function
	const handleEdit = (id: string) => {
		navigate(`/event/${id}/edit`)
	}

	// Define handleDelete function
	const handleDelete = (id: string) => {
		console.log('Delete action for row:', id)
		// TODO: Implement delete action
	}

	const columns = [
		{ id: 'id', label: eventTableTranslations.id },
		{ id: 'eventDate', label: eventTableTranslations.eventDate },
		{ id: 'eventType', label: eventTableTranslations.eventType },
		{ id: 'eventSubType', label: eventTableTranslations.eventSubtype },
		{ id: 'location', label: eventTableTranslations.location },
		{ id: 'reporter', label: eventTableTranslations.reporter },
		{ id: 'recordedDate', label: eventTableTranslations.recordedDate },
		{ id: 'lastUpdatedBy', label: eventTableTranslations.lastUpdatedBy },
		{ id: 'status', label: eventTableTranslations.status },
		{
			id: 'actions',
			label: eventTableTranslations.actions,
			render: (data: Event) => (
				<ActionsMenu
					onView={() => handleView(data.id)}
					onEdit={() => handleEdit(data.id)}
					onDelete={() => handleDelete(data.id)}
				/>
			),
		},
	]

	return (
		<Container maxWidth='xl'>
			<Grid container justifyContent='flex-end'>
				<Button onClick={() => navigate('/event/create')} sx={{ margin: 1 }}>
					<AddCircleOutline sx={{ marginRight: 1 }} /> Add Event
				</Button>
			</Grid>
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

export default EventListView
