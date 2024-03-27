import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { PieChart } from '../../components'
import { HeaderContext, ThemeContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEvents } from '../../store/actions/mongodb/eventActions'

const EventAnalyticsDetailsView: FC = () => {
	const { t } = useTranslation()
	const { setHeaderData } = useContext(HeaderContext)
	const isDarkTheme = useContext(ThemeContext)
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
			header: 'Event Analytics', // TODO: Add Translation
			subheader: 'Event Analytics Details', // TODO: Add Translation
			extraContent: (
				/* TODO: Fix this formatting to match others */
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography>Event Analytics{/* TODO: Add Translation */}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption'>Total Events:{/* TODO: Add Translation */}</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{events.length}
						</Typography>
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
	}, [setHeaderData, events, t])

	// Calculate the total number of events
	const totalEvents = events.length

	// Calculate the total number of events reported by each month of each year
	const monthlyEvents = events.reduce(
		(acc, event) => {
			const reportedDate = new Date(event.reported.reportedDate)
			const month = reportedDate.getMonth()
			const year = reportedDate.getFullYear()
			const key = `${month}/${year}`
			acc[key] = acc[key] ? acc[key] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each event type
	const eventTypeEvents = events.reduce(
		(acc, event) => {
			const key = event.type.eventType
			acc[key] = acc[key] ? acc[key] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each event sub-type
	const eventSubTypeEvents = events.reduce(
		(acc, event) => {
			const key = event.type.eventSubType
			acc[key] = acc[key] ? acc[key] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each country
	const countryEvents = events.reduce(
		(acc, event) => {
			const key = event.location.country
			acc[key] = acc[key] ? acc[key] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each US state if the country is the US
	const usStateEvents = events.reduce(
		(acc, event) => {
			if (event.location.country === 'United States of America') {
				const key = event.location.state
				acc[key] = acc[key] ? acc[key] + 1 : 1
			}
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each method of receipt
	const methodOfReceiptEvents = events.reduce(
		(acc, event) => {
			const key = event.details.methodOfReceipt
			acc[key] = acc[key] ? acc[key] + 1 : 1
			return acc
		},
		{} as { [key: string]: number },
	)

	// Calculate the total number of events by each tag
	const tagEvents = events.reduce(
		(acc, event) => {
			event.details.tagging.forEach((tag) => {
				acc[tag] = acc[tag] ? acc[tag] + 1 : 1
			})
			return acc
		},
		{} as { [key: string]: number },
	)

	useEffect(() => {
		console.log('---------------------------------')
		console.log('totalEvents:', totalEvents)
		console.log('monthlyEvents:', monthlyEvents)
		console.log('eventTypeEvents:', eventTypeEvents)
		console.log('eventSubTypeEvents:', eventSubTypeEvents)
		console.log('countryEvents:', countryEvents)
		console.log('usStateEvents:', usStateEvents)
		console.log('methodOfReceiptEvents:', methodOfReceiptEvents)
		console.log('tagEvents:', tagEvents)
	}, [])

	const colors = isDarkTheme
		? ['#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1']
		: ['#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff']

	return (
		<Container maxWidth='xl'>
			{loading ? (
				<Typography variant='h6'>{t('common.statusIndicator.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
			) : (
				<Container>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<Typography variant='h6'>Events by Month and Year</Typography>
							<Grid container spacing={2}>
								{Object.entries(monthlyEvents).map(([key, value]) => (
									<Grid item xs={12} sm={6} md={4} lg={3} key={key}>
										<Typography>
											{key}: {value}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by Type</Typography>
							<PieChart
								data={Object.values(eventTypeEvents)}
								title='Events by Event Type'
								labels={Object.keys(eventTypeEvents)}
								colors={colors}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by Sub-Type</Typography>
							<PieChart
								data={Object.values(eventSubTypeEvents)}
								title='Events by Event Sub-Type'
								labels={Object.keys(eventSubTypeEvents)}
								colors={colors}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by Country</Typography>
							<PieChart
								data={Object.values(countryEvents)}
								title='Events by Country'
								labels={Object.keys(countryEvents)}
								colors={colors}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by US State</Typography>
							<PieChart
								data={Object.values(usStateEvents)}
								title='Events by US State'
								labels={Object.keys(usStateEvents)}
								colors={colors}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by Method of Receipt</Typography>
							<PieChart
								data={Object.values(methodOfReceiptEvents)}
								title='Events by Method of Receipt'
								labels={Object.keys(methodOfReceiptEvents)}
								colors={colors}
							/>
						</Grid>
						<Grid item xs={4}>
							<Typography variant='h6'>Events by Tag</Typography>
							<PieChart
								data={Object.values(tagEvents)}
								title='Events by Tag'
								labels={Object.keys(tagEvents)}
								colors={colors}
							/>
						</Grid>
					</Grid>
				</Container>
			)}
		</Container>
	)
}

export default EventAnalyticsDetailsView
