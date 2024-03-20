import { AddCircleOutline } from '@mui/icons-material'
import { Button, capitalize, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RootState } from 'store'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts/HeaderContext'
import translations from '../../i18n/locales'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'
import { ExtractLastFiveDigits, GetCountryAbbreviation, GetStateAbbreviation, TimeConversionsHelper } from '../../utils'

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

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Events',
			subheader: 'All Events',
			extraContent: (
				<Grid container spacing={1} direction='column' alignItems='flex-start'>
					<Grid item>
						<Typography>Total Events: {events.length}</Typography>
						<Divider />
					</Grid>
					{getEventStatusCounts(events).map(({ status, count }) => (
						<Grid item key={status}>
							<Typography>
								{capitalize(status)}: {count}
							</Typography>
						</Grid>
					))}
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
	}, [setHeaderData])

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
			id: '_id',
			label: 'ID',
			render: (data: Event) => <Typography>{data._id ? ExtractLastFiveDigits(data._id) : 'N/A'}</Typography>,
		},
		{
			id: 'type',
			label: 'Type',
			render: (data: Event) => (
				<>
					<Typography>{data.type ? data.type.eventType : 'N/A'}</Typography>
					<Divider />
					<Typography>{data.type ? data.type.eventSubType : 'N/A'}</Typography>
				</>
			),
		},
		{
			id: 'title',
			label: 'Title',
			render: (data: Event) => <Typography>{data.details ? data.details.title : 'N/A'}</Typography>,
		},
		{
			id: 'tagging',
			label: 'Tagging',
			render: (data: Event) => (
				<Typography>
					{data.details ? (data.details.tagging ? data.details.tagging.join(', ') : 'N/A') : 'N/A'}
				</Typography>
			),
		},
		{
			id: 'location',
			label: 'Location',
			render: (data: Event) => (
				<Typography>
					{data.location
						? `${data.location.city}, ${GetStateAbbreviation(data.location.state)}, ${GetCountryAbbreviation(
								data.location.country,
							)}`
						: 'N/A'}
				</Typography>
			),
		},
		{
			id: 'methodOfReceipt',
			label: 'Method of Receipt',
			render: (data: Event) => <Typography>{data.details ? data.details.methodOfReceipt : 'N/A'}</Typography>,
		},
		{
			id: 'Dates',
			label: 'Dates',
			render: (data: Event) => (
				<Typography>
					Reported:{' '}
					{data.reported
						? TimeConversionsHelper.convertTime(data.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC') +
							' by ' +
							(data.reported.reporter ? data.reported.reporter : 'N/A')
						: 'N/A'}
					<br />
					Submitted:{' '}
					{data.submitted
						? `${TimeConversionsHelper.convertTime(data.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC')} by ${
								data.submitted.submittedBy ? data.submitted.submittedBy : 'N/A'
							}`
						: 'N/A'}
					<br />
					Updated:{' '}
					{data.updated
						? TimeConversionsHelper.convertTime(data.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC') +
							' by ' +
							(data.updated.updatedBy ? data.updated.updatedBy : 'N/A')
						: 'N/A'}
				</Typography>
			),
		},
		{
			id: 'status',
			label: 'Status',
			render: (data: Event) => <Typography>{data.status ? capitalize(data.status) : 'N/A'}</Typography>,
		},
		{
			id: 'actions',
			label: eventTableTranslations.actions,
			render: (data: Event) => (
				<ActionsMenu
					onView={() => handleView(data._id ?? '')}
					onEdit={() => handleEdit(data._id ?? '')}
					onDelete={() => handleDelete(data._id ?? '')}
				/>
			),
		},
	]

	const getEventStatusCounts = (events: Event[]) => {
		const statusCounts: { [key: string]: number } = {}
		events.forEach((event) => {
			const status = event.status.toLowerCase()
			statusCounts[status] = (statusCounts[status] || 0) + 1
		})
		return Object.entries(statusCounts).map(([status, count]) => ({ status, count }))
	}

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
