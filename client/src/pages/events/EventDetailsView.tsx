import React, { FC, useContext, useEffect } from 'react'
import { HeaderContext } from '../../contexts/HeaderContext'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { readEvent } from '../../store/actions/mongodb/eventActions'
import { RootState } from 'store'
import { Container, Typography } from '@mui/material'

const EventDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const { eventId } = useParams()

	useEffect(() => {
		console.log(eventId)
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
			extraContent: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
			})
		}
	}, [setHeaderData])

	useEffect(() => {
		console.log(event)
	}, [event])

	return (
		<Container maxWidth='xl'>
			{/* Display event details */}
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<>Event</>
			)}
		</Container>
	)
}

export default EventDetailsView
