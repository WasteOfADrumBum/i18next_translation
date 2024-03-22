import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import translations from '../../i18n/locales'
import { AppDispatch, RootState } from '../../store'
import { readEvent } from '../../store/actions/mongodb/eventActions'
import { TimeConversionsHelper } from '../../utils'

const eventHeaderT = translations.pages.events.header
const eventFieldT = translations.pages.events.fields
const eventTitlesT = translations.pages.events.titles
const statusIndicatorT = translations.common.statusIndicator

const EventDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()
	const { eventId } = useParams()

	useEffect(() => {
		// Fetch event details from Redux store
		if (eventId) {
			// Check if eventId is not undefined
			dispatch(readEvent(eventId))
		}
	}, [dispatch, eventId])

	// Access event details from Redux store
	const { event, loading, error } = useSelector((state: RootState) => state.events)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: eventHeaderT.title.single,
			subheader: eventHeaderT.subtitle.single,
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.id}</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?._id}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.submitted.submittedBy}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.submitted?.submittedBy}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.submitted.submittedDate}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.submitted?.submittedDate
										? TimeConversionsHelper.convertTime(event?.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC')
										: statusIndicatorT.na}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.reported.reporter}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.reported?.reporter}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.reported.reportedDate}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.reported?.reportedDate
										? TimeConversionsHelper.convertTime(event?.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC')
										: statusIndicatorT.na}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.updated.updatedBy}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.updated?.updatedBy}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{eventFieldT.updated.updatedDate}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.updated?.updatedDate
										? TimeConversionsHelper.convertTime(event?.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC')
										: statusIndicatorT.na}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: 'dashboard',
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: '',
				subheader: '',
				extraContent: null,
			})
		}
	}, [setHeaderData, event])

	return (
		<Container maxWidth='xl'>
			{loading ? (
				<Typography variant='h6'>{statusIndicatorT.loading}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{statusIndicatorT.error}: {error.toString()}
				</Typography>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' mb={1} color='primary'>
							{event?.details?.title || eventFieldT.details.title + ' ' + statusIndicatorT.notAvailable}
						</Typography>
						<Divider />
						<Typography variant='body1' mt={1}>
							{event?.details?.description || eventFieldT.details.description + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							Method of Receipt:{' '}
							{event?.details?.methodOfReceipt ||
								eventFieldT.details.methodOfReceipt + ' ' + statusIndicatorT.notAvailable}
						</Typography>
						<Typography variant='subtitle1'>
							{eventTitlesT.location}: {event?.location?.address}, {event?.location?.city}, {event?.location?.state},{' '}
							{event?.location?.zip}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							{eventFieldT.details.tagging}:{' '}
							{event?.details?.tagging?.join(', ') || eventFieldT.details.tagging + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EventDetailsView
