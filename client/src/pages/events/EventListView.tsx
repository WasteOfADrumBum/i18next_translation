import React, { useContext, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Container, Grid, Typography } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import translations from '../../i18n/locales'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { HeaderContext } from '../../contexts/HeaderContext'
import { useNavigate } from 'react-router-dom'
import { Event } from '../../store/types/EventTypes'
import { RootState } from 'store'
import TimeConversionsHelper from '../../utils/TimeConversionsHelper'

const eventHeaderTranslations = translations.pages.events.header
const eventTableTranslations = translations.pages.events.table.labels

const EventListView: FC = () => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()

	// Fetch events from Redux store
	useEffect(() => {
		dispatch(getEvents())
	}, [dispatch])

	// Access events from Redux store
	const { events, loading, error } = useSelector((state: RootState) => state.events)

	// Log events when they are updated in the Redux store
	useEffect(() => {
		console.log('Events in Redux store:', events)
	}, [events])

	const handleView = (id: string | undefined) => {
		if (id) {
			navigate(`/dashboard/event/${id}/details`)
		}
	}

	const handleEdit = (id: string | undefined) => {
		if (id) {
			navigate(`/event/${id}/edit`)
		}
	}

	const handleDelete = (id: string | undefined) => {
		if (id) {
			console.log('Delete action for row:', id)
		}
	}

	const columns = [
		{
			id: 'title',
			label: 'Title',
			render: (data: Event) => <Typography>{data.details.title}</Typography>,
		},
		{
			id: 'description',
			label: 'Description',
			render: (data: Event) => <Typography>{data.details.description}</Typography>,
		},
		{
			id: 'methodOfReceipt',
			label: 'Method of Receipt',
			render: (data: Event) => <Typography>{data.details.methodOfReceipt}</Typography>,
		},
		{
			id: 'tagging',
			label: 'Tagging',
			render: (data: Event) => <Typography>{data.details.tagging.join(', ')}</Typography>,
		},
		{
			id: 'location',
			label: 'Location',
			render: (data: Event) => (
				<Typography>
					{data.location.address}, {data.location.city}, {data.location.state}, {data.location.country}
				</Typography>
			),
		},
		{
			id: 'reported',
			label: 'Reported',
			render: (data: Event) => (
				<Typography>
					{TimeConversionsHelper.convertTime(
						data.reported.reportedDate,
						'YYYY-MM-DD hh:mm:ss',
						true, // Include time
						'UTC', // Timezone
					)}
				</Typography>
			),
		},
		{
			id: 'submitted',
			label: 'Submitted',
			render: (data: Event) => (
				<Typography>
					{TimeConversionsHelper.convertTime(
						data.submitted.submittedDate,
						'YYYY-MM-DD hh:mm:ss',
						true, // Include time
						'UTC', // Timezone
					)}
				</Typography>
			),
		},
		{
			id: 'type',
			label: 'Type',
			render: (data: Event) => (
				<Typography>
					{data.type.eventType} - {data.type.eventSubType}
				</Typography>
			),
		},
		{
			id: 'updated',
			label: 'Updated',
			render: (data: Event) => (
				<Typography>
					{TimeConversionsHelper.convertTime(
						data.updated.updatedDate,
						'YYYY-MM-DD hh:mm:ss',
						true, // Include time
						'UTC', // Timezone
					)}
				</Typography>
			),
		},
		{
			id: 'actions',
			label: eventTableTranslations.actions,
			render: (data: Event) => (
				<ActionsMenu
					onView={() => handleView(data.id ?? '')}
					onEdit={() => handleEdit(data.id ?? '')}
					onDelete={() => handleDelete(data.id ?? '')}
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
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<DynamicDataTable
					data={events}
					columns={columns}
					rowsPerPageOptions={[5, 10, 25]}
					pagination={{ rowsPerPage: 5 }}
					page={0}
					onPageChange={(newPage) => console.log('Page changed to:', newPage)}
					onRowsPerPageChange={(newRowsPerPage) => console.log('Rows per page changed to:', newRowsPerPage)}
				/>
			)}
		</Container>
	)
}

export default EventListView
