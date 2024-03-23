import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { readEvent } from '../../store/actions/mongodb/eventActions'
import { TimeConversionsHelper } from '../../utils'

const EventDetailsView: FC = () => {
	const { t } = useTranslation()
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
			header: t('pages:events.header.title.single'),
			subheader: t('pages:events.header.subtitle.single'),
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages:events.fields.id')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{event?._id}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages:events.titles.submitted')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{event?.submitted?.submittedDate
								? TimeConversionsHelper.convertTime(event?.submitted.submittedDate, 'MM/DD/YYYY', false, 'UTC')
								: t('pages:events.fields.submitted.submittedDate') + ' ' + t('common.statusIndicator.na')}{' '}
							{t('common:prepositions.by')}{' '}
							{event?.submitted?.submittedBy ||
								t('pages:events.fields.submitted.submittedBy') + ' ' + t('common.statusIndicator.na')}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages:events.titles.reported')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{event?.reported?.reportedDate
								? TimeConversionsHelper.convertTime(event?.reported.reportedDate, 'MM/DD/YYYY', false, 'UTC')
								: t('pages:events.fields.reported.reportedDate') + ' ' + t('common.statusIndicator.na')}{' '}
							{t('common:prepositions.by')}{' '}
							{event?.reported?.reporter ||
								t('pages:events.fields.reported.reporter') + ' ' + t('common.statusIndicator.na')}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages:events.titles.updated')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{event?.updated?.updatedDate
								? TimeConversionsHelper.convertTime(event?.updated.updatedDate, 'MM/DD/YYYY', false, 'UTC')
								: t('pages:events.fields.updated.updatedDate') + ' ' + t('common.statusIndicator.na')}{' '}
							{t('common:prepositions.by')}{' '}
							{event?.updated?.updatedBy ||
								t('pages:events.fields.updated.updatedBy') + ' ' + t('common.statusIndicator.na')}
						</Typography>
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
				<Typography variant='h6'>{t('common.statusIndicator.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h5' mb={1} color='primary'>
							{event?.details?.title ||
								t('pages:events.fields.details.title') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
						<Divider />
						<Typography variant='body1' mt={1}>
							{event?.details?.description ||
								t('pages:events.fields.details.description') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							Method of Receipt:{' '}
							{event?.details?.methodOfReceipt ||
								t('pages:events.fields.details.methodOfReceipt') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
						<Typography variant='subtitle1'>
							{t('pages:events.titles.location')}: {event?.location?.address}, {event?.location?.city},{' '}
							{event?.location?.state}, {event?.location?.zip}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>
							{t('pages:events.fields.details.tagging')}:{' '}
							{event?.details?.tagging?.join(', ') ||
								t('pages:events.fields.details.tagging') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EventDetailsView
