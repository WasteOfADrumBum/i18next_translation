import React, { FC, useContext, useEffect } from 'react'
import { HeaderContext } from '../../contexts/HeaderContext'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { readEvent } from '../../store/actions/mongodb/eventActions'
import { RootState } from 'store'
import { Container, Typography, Grid, Divider } from '@mui/material'
import { TimeConversionsHelper } from '../../utils'

const EventDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
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
			header: 'Event Details',
			subheader: 'Details for your primary event record',
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12} direction='row'>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>ID:</Typography>
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
								<Typography variant='caption'>Submitted By:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.submitted?.submittedBy}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Submitted Date:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.submitted?.submittedDate
										? TimeConversionsHelper.convertTime(event?.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC')
										: 'N/A'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Reported By:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.reported?.reporter}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Reported Date:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.reported?.reportedDate
										? TimeConversionsHelper.convertTime(event?.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC')
										: 'N/A'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Updated By:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.updated?.updatedBy}
								</Typography>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Updated Date:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{event?.updated?.updatedDate
										? TimeConversionsHelper.convertTime(event?.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC')
										: 'N/A'}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			),
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
			})
		}
	}, [setHeaderData, event])

	return (
		<Container maxWidth='xl'>
			{/* Display event details */}
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' mb={1} color='primary'>
							{event?.details?.title || 'Title not available'}
						</Typography>
						<Divider />
						<Typography variant='body1' mt={1}>
							{event?.details?.description || 'Description not available'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							Method of Receipt: {event?.details?.methodOfReceipt || 'Method of receipt not available'}
						</Typography>
						<Typography variant='subtitle1'>
							Location: {event?.location?.address}, {event?.location?.city}, {event?.location?.state},{' '}
							{event?.location?.zip}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							Tags: {event?.details?.tagging?.join(', ') || 'Tags not available'}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EventDetailsView
