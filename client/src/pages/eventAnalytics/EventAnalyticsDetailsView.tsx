import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart, DoughnutChart, LineChart, PieChart, PolarAreaChart, RadarChart } from '../../components'
import { HeaderContext, ThemeContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEvents } from '../../store/actions/mongodb/eventActions'

interface DatasetObject {
	[key: string]: number
}

const EventAnalyticsDetailsView: FC = () => {
	const { t } = useTranslation()
	const { setHeaderData } = useContext(HeaderContext)
	const { darkMode } = useContext(ThemeContext)
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

	// Calculate the total number of events reported by each month of each year
	const monthlyEvents = events.reduce(
		(acc, event) => {
			const reportedDate = new Date(event.reported.reportedDate)
			const month = reportedDate.getMonth()
			const year = reportedDate.getFullYear()
			const key = `${year}-${month + 1}` // Adding 1 to month to make it 1-indexed
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

	// Define a function to construct datasets dynamically
	const getDatasets = (data: DatasetObject) => {
		return Object.entries(data).map(([label, value]) => ({
			label: label,
			data: [value], // Wrap value in an array as each dataset contains only one data point
		}))
	}

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

	const colors = darkMode
		? ['#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1']
		: ['#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff']

	return (
		<Container maxWidth='xl'>
			{loading ? (
				<Typography variant='h6' sx={{ textAlign: 'center' }}>
					{t('common.statusIndicator.loading')}
				</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6' sx={{ textAlign: 'center' }}>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
			) : (
				<Container>
					<Grid container spacing={2}>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Month and Year
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<LineChart
									labels={Object.keys(monthlyEvents)}
									datasets={[
										{
											label: 'Events by Month and Year',
											data: Object.values(monthlyEvents),
											borderColor: darkMode ? '#90caf9B3' : '#2196f3B3',
											backgroundColor: darkMode ? '#90caf9B3' : '#2196f3B3',
										},
									]}
								/>
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Type
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<BarChart labels={['']} colors={colors} datasets={getDatasets(eventTypeEvents)} />
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Sub-Type
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<BarChart vertical labels={['']} colors={colors} datasets={getDatasets(eventSubTypeEvents)} />
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Country
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<PieChart
									data={Object.values(countryEvents)}
									title='Events by Country'
									labels={Object.keys(countryEvents)}
									colors={colors}
								/>
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by US State
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<PolarAreaChart
									data={Object.values(usStateEvents)}
									title='Events by US State'
									labels={Object.keys(usStateEvents)}
									colors={colors}
								/>
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={4}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Method of Receipt
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<DoughnutChart
									data={Object.values(methodOfReceiptEvents)}
									title='Events by Method of Receipt'
									labels={Object.keys(methodOfReceiptEvents)}
									colors={colors}
								/>
							</Grid>
						</Grid>
						<Grid item mb={4} p={2} xs={6}>
							<Typography variant='h6' mb={1} sx={{ textAlign: 'center' }}>
								Events by Tag
							</Typography>
							<Grid
								container
								spacing={2}
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
								<RadarChart
									data={Object.values(tagEvents)}
									title='Events by Tag'
									labels={Object.keys(tagEvents)}
									colors={colors}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			)}
		</Container>
	)
}

export default EventAnalyticsDetailsView
