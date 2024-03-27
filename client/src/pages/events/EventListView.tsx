import { AddCircleOutline } from '@mui/icons-material'
import { Button, capitalize, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'
import { getCountryAbbreviations, getLastFiveDigits, getStateAbbreviations, getTimeConversion } from '../../utils'

const EventListView: FC = () => {
	const { t } = useTranslation()
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
			header: t('pages.events.header.title.all'),
			subheader: t('pages.events.header.subtitle.all'),
			extraContent: (
				/* TODO: Fix this formatting to match others */
				<Grid container spacing={1} direction='column' alignItems='flex-start'>
					<Grid item>
						<Typography>
							{t('pages.events.header.content.total')} : {events.length}
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
	}, [setHeaderData, events, t])

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
			label: t('pages.events.fields.id'),
			render: (data: Event) => (
				<Typography>{data._id ? getLastFiveDigits(data._id) : t('common.statusIndicator.na')}</Typography>
			),
		},
		{
			id: 'type',
			label: t('pages.events.titles.type'),
			render: (data: Event) => (
				<>
					<Typography>{data.type ? data.type.eventType : t('common.statusIndicator.na')}</Typography>
					<Divider />
					<Typography>{data.type ? data.type.eventSubType : t('common.statusIndicator.na')}</Typography>
				</>
			),
		},
		{
			id: 'title',
			label: t('pages.events.fields.details.title'),
			render: (data: Event) => (
				<Typography>{data.details ? data.details.title : t('common.statusIndicator.na')}</Typography>
			),
		},
		{
			id: 'tagging',
			label: t('pages.events.fields.details.tagging'),
			render: (data: Event) => (
				<Typography>
					{data.details
						? data.details.tagging
							? data.details.tagging.join(', ')
							: t('common.statusIndicator.na')
						: t('common.statusIndicator.na')}
				</Typography>
			),
		},
		{
			id: 'location',
			label: t('pages.events.titles.location'),
			render: (data: Event) => (
				<Typography>
					{data.location
						? `${data.location.city}, ${getStateAbbreviations(data.location.state)}, ${getCountryAbbreviations(
								data.location.country,
							)}`
						: t('common.statusIndicator.na')}
				</Typography>
			),
		},
		{
			id: 'methodOfReceipt',
			label: t('pages.events.fields.details.methodOfReceipt'),
			render: (data: Event) => (
				<Typography>{data.details ? data.details.methodOfReceipt : t('common.statusIndicator.na')}</Typography>
			),
		},
		{
			id: 'Dates',
			label: t('pages.events.titles.dates'),
			render: (data: Event) => (
				<Typography>
					{t('pages.events.titles.reported')}:{' '}
					{data.reported
						? getTimeConversion.convertTime(t, data.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC') +
							` ${t('common.prepositions.by')} ` +
							(data.reported.reporter ? data.reported.reporter : t('common.statusIndicator.na'))
						: t('common.statusIndicator.na')}
					<br />
					{t('pages.events.titles.submitted')}:{' '}
					{data.submitted
						? getTimeConversion.convertTime(t, data.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC') +
							` ${t('common.prepositions.by')} ` +
							(data.submitted.submittedBy ? data.submitted.submittedBy : t('common.statusIndicator.na'))
						: t('common.statusIndicator.na')}
					<br />
					{t('pages.events.titles.updated')}:{' '}
					{data.updated
						? getTimeConversion.convertTime(t, data.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC') +
							` ${t('common.prepositions.by')} ` +
							(data.updated.updatedBy ? data.updated.updatedBy : t('common.statusIndicator.na'))
						: t('common.statusIndicator.na')}
				</Typography>
			),
		},
		{
			id: 'status',
			label: t('pages.events.fields.status'),
			render: (data: Event) => (
				<Typography>{data.status ? capitalize(data.status) : t('common.statusIndicator.na')}</Typography>
			),
		},
		{
			id: 'actions',
			label: t('common.tables.actions'),
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
					<AddCircleOutline sx={{ marginRight: 1 }} /> {t('pages.events.buttons.new')}
				</Button>
			</Grid>
			{loading ? (
				<Typography variant='h6'>{t('common.statusIndicator.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
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
