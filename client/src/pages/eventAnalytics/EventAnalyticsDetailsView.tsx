import { capitalize, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'

const EventAnalyticsDetailsView: FC = () => {
	// TODO: EventAnalyticsDetailsView tasks
	// * Add Translations
	// * Setup Header
	// * Add Stats/Chart for dynamically displaying the occurance of events based on month and year (Reported Date)
	// * Add Stats/Chart for dynamically displaying the occurance of events based on event type
	// * Add Stats/Chart for dynamically displaying the occurance of events based on event sub-type
	// * Add Stats/Chart for dynamically displaying the occurance of events based on event country and us states
	// * Add Stats/Chart for dynamically displaying the occurance of events based on method of reciept
	// * Add Stats/Chart for dynamically displaying the occurance of events based on tags

	const { t } = useTranslation()
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
						<Typography>Event Analytics {/* TODO: Add Translation */}</Typography>
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

	const getEventStatusCounts = (events: Event[]) => {
		const statusCounts: { [key: string]: number } = {}
		events.forEach((event) => {
			const status = event.status.toLowerCase()
			statusCounts[status] = (statusCounts[status] || 0) + 1
		})
		return Object.entries(statusCounts).map(([status, count]) => ({ status, count }))
	}

	return <></>
}

export default EventAnalyticsDetailsView
