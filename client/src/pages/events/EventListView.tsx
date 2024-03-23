import { AddCircleOutline } from '@mui/icons-material'
import { Button, capitalize, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts'
import translations from '../../i18n/locales'
import { AppDispatch, RootState } from '../../store'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'
import { ExtractLastFiveDigits, GetCountryAbbreviation, GetStateAbbreviation, TimeConversionsHelper } from '../../utils'

const eventHeaderT = translations.pages.events.en.header
const eventFieldT = translations.pages.events.en.fields
const eventTitlesT = translations.pages.events.en.titles
const eventButtonT = translations.pages.events.en.buttons
const prepositions = translations.common.en.prepositions
const statusIndicatorT = translations.common.en.statusIndicator

const EventListView: FC = () => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()

	// Fetch events from Redux store
	useEffect(() => {
		dispatch(getEvents())
	}, [dispatch])

	// Access events from Redux store
	const { events, loading, error } = useSelector((state: RootState) => state.events)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: eventHeaderT.title.all,
			subheader: eventHeaderT.subtitle.all,
			extraContent: (
				/* TODO: Fix this formatting to match others */
				<Grid container spacing={1} direction='column' alignItems='flex-start'>
					<Grid item>
						<Typography>
							{eventHeaderT.content.total} : {events.length}
						</Typography>
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
	}, [setHeaderData, events])

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
			label: eventFieldT.id,
			render: (data: Event) => (
				<Typography>{data._id ? ExtractLastFiveDigits(data._id) : statusIndicatorT.na}</Typography>
			),
		},
		{
			id: 'type',
			label: eventTitlesT.type,
			render: (data: Event) => (
				<>
					<Typography>{data.type ? data.type.eventType : statusIndicatorT.na}</Typography>
					<Divider />
					<Typography>{data.type ? data.type.eventSubType : statusIndicatorT.na}</Typography>
				</>
			),
		},
		{
			id: 'title',
			label: eventFieldT.details.title,
			render: (data: Event) => <Typography>{data.details ? data.details.title : statusIndicatorT.na}</Typography>,
		},
		{
			id: 'tagging',
			label: 'Tagging',
			render: (data: Event) => (
				<Typography>
					{data.details
						? data.details.tagging
							? data.details.tagging.join(', ')
							: statusIndicatorT.na
						: statusIndicatorT.na}
				</Typography>
			),
		},
		{
			id: 'location',
			label: eventTitlesT.location,
			render: (data: Event) => (
				<Typography>
					{data.location
						? `${data.location.city}, ${GetStateAbbreviation(data.location.state)}, ${GetCountryAbbreviation(
								data.location.country,
							)}`
						: statusIndicatorT.na}
				</Typography>
			),
		},
		{
			id: 'methodOfReceipt',
			label: eventFieldT.details.methodOfReceipt,
			render: (data: Event) => (
				<Typography>{data.details ? data.details.methodOfReceipt : statusIndicatorT.na}</Typography>
			),
		},
		{
			id: 'Dates',
			label: 'Dates',
			render: (data: Event) => (
				<Typography>
					{eventTitlesT.reported}:{' '}
					{data.reported
						? TimeConversionsHelper.convertTime(data.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC') +
							` ${prepositions.by} ` +
							(data.reported.reporter ? data.reported.reporter : statusIndicatorT.na)
						: statusIndicatorT.na}
					<br />
					{eventTitlesT.submitted}:{' '}
					{data.submitted
						? `${TimeConversionsHelper.convertTime(data.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC')} by ${
								data.submitted.submittedBy ? data.submitted.submittedBy : statusIndicatorT.na
							}`
						: statusIndicatorT.na}
					<br />
					{eventTitlesT.updated}:{' '}
					{data.updated
						? TimeConversionsHelper.convertTime(data.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC') +
							` ${prepositions.by} ` +
							(data.updated.updatedBy ? data.updated.updatedBy : statusIndicatorT.na)
						: statusIndicatorT.na}
				</Typography>
			),
		},
		{
			id: 'status',
			label: eventFieldT.status,
			render: (data: Event) => <Typography>{data.status ? capitalize(data.status) : statusIndicatorT.na}</Typography>,
		},
		{
			id: 'actions',
			label: translations.common.en.tables.actions,
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
					<AddCircleOutline sx={{ marginRight: 1 }} /> {eventButtonT.new}
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
