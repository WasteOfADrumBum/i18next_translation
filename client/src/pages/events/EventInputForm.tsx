import React, { useState, FC, useContext, useEffect, FormEvent } from 'react'
// @ts-ignore
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Typography, TextField, Button, CircularProgress, Grid } from '@mui/material'
import { createEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../types/events/EventTypes'
import { EventFormData } from '../../../types/events/EventFormTypes'
import { AppDispatch } from 'store'
import { HeaderContext } from '../../contexts/HeaderContext'
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'

interface EventInputFormProps {
	eventValues?: EventFormData
}

const EventInputForm: FC<EventInputFormProps> = ({ eventValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: eventValues ? 'Update Event' : 'Add Event',
			subheader: eventValues ? 'Update an existing event' : 'Add a new event',
			extraContent: <Grid container spacing={0}></Grid>,
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

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [formData, setFormData] = useState<EventFormData>({
		id: eventValues?.id,
		reporter: eventValues?.reporter || '',
		reportedDate: eventValues?.reportedDate || new Date(),
		updatedBy: eventValues?.updatedBy || '',
		updatedDate: eventValues?.updatedDate || new Date(),
		submittedBy: eventValues?.submittedBy || '',
		submittedDate: eventValues?.submittedDate || new Date(),
		eventType: eventValues?.eventType || '',
		eventSubType: eventValues?.eventSubType || '',
		title: eventValues?.title || '',
		description: eventValues?.description || '',
		tagging: eventValues?.tagging || [],
		methodOfReceipt: eventValues?.methodOfReceipt || '',
		address: eventValues?.address || '',
		city: eventValues?.city || '',
		zip: eventValues?.zip || 0,
		country: eventValues?.country || '',
		county: eventValues?.county || '',
		state: eventValues?.state || '',
	})

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault() // Prevent default form submission behavior

		setLoading(true)
		setError(null)

		try {
			const eventData: Event = {
				id: formData.id || null,
				reported: {
					reporter: formData.reporter,
					reportedDate: formData.reportedDate,
				},
				updated: {
					updatedBy: formData.updatedBy,
					updatedDate: formData.updatedDate,
				},
				submitted: {
					submittedBy: formData.submittedBy,
					submittedDate: formData.submittedDate,
				},
				type: {
					eventType: formData.eventType,
					eventSubType: formData.eventSubType,
				},
				details: {
					title: formData.title,
					description: formData.description,
					tagging: formData.tagging,
					methodOfReceipt: formData.methodOfReceipt,
				},
				location: {
					address: formData.address,
					city: formData.city,
					zip: formData.zip,
					country: formData.country,
					county: formData.county,
					state: formData.state,
				},
			}

			if (eventValues) {
				console.log('Update Event:', eventData)
				await dispatch(updateEvent(eventData))
			} else {
				console.log('Add Event:', eventData)
				await dispatch(createEvent(eventData))
			}
		} catch (error: any) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container>
			{loading && <CircularProgress />}
			{error && <Typography color='error'>{error}</Typography>}
			<form onSubmit={onSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							name='reporter'
							label='Reporter'
							variant='outlined'
							fullWidth
							value={formData.reporter}
							onChange={handleFormChange}
						/>
					</Grid>
					<Grid item xs={6}>
						{/* reportedDate */}
					</Grid>
					<Grid item container xs={12} justifyContent='space-between'>
						<Button variant='contained' color='secondary' onClick={() => navigate('/dashboard')}>
							<CancelOutlined sx={{ marginRight: 1 }} />
							Cancel
						</Button>
						<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
							<AddCircleOutline sx={{ marginRight: 1 }} />
							{eventValues ? 'Save Changes' : 'Add Event'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}

export default EventInputForm
