import React, { useState, FC, useContext, useEffect, FormEvent } from 'react'
// @ts-ignore
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Typography, TextField, Button, CircularProgress, Grid, Divider } from '@mui/material'
import { createEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../types/events/EventTypes'
import { EventFormData } from '../../../types/events/EventFormTypes'
import { AppDispatch } from 'store'
import { HeaderContext } from '../../contexts/HeaderContext'
import { AddCircleOutline, CancelOutlined, Today } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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
	const [formSubmitted, setFormSubmitted] = useState(false)

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleFormDateChange = (date: dayjs.Dayjs | null) => {
		if (date) {
			setFormData((prevState) => ({
				...prevState,
				reportedDate: date.toDate(),
			}))
		}
	}

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault() // Prevent default form submission behavior

		setFormSubmitted(true)

		let formValid = true // Flag to track overall form validity

		// Iterate over form fields to perform validation
		Object.keys(formData).forEach((fieldName) => {
			// Check if field is empty
			if (formData[fieldName as keyof EventFormData] === '') {
				formValid = false // Set formValid flag to false if any field is empty
			}
		})

		if (!formValid) {
			// If any field is empty, return without submitting
			return
		}

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
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				{loading && <CircularProgress />}
				{error && <Typography color='error'>{error}</Typography>}
				<form onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Who
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='h4' color={'primary'} mb={1}>
								When
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='reporter'
								label='Reporter'
								variant='outlined'
								fullWidth
								value={formData.reporter}
								onChange={handleFormChange}
								error={formSubmitted && formData.reporter === ''}
								helperText={formSubmitted && formData.reporter === '' ? 'Reporter is required' : ''}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='reportedDate'
								label='Reported Date'
								defaultValue={dayjs()}
								value={dayjs(formData.reportedDate)}
								onChange={(date) => handleFormDateChange(date)}
								disableFuture
								slotProps={{
									textField: {
										required: true,
										fullWidth: true,
									},
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='submittedBy'
								label='Submitted By'
								variant='outlined'
								fullWidth
								value={formData.submittedBy}
								onChange={handleFormChange}
								error={formSubmitted && formData.submittedBy === ''}
								helperText={formSubmitted && formData.submittedBy === '' ? 'Submitted by is required' : ''}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='submittedDate'
								label='Submitted Date'
								defaultValue={dayjs()}
								value={dayjs(formData.submittedDate)}
								onChange={(date) => handleFormDateChange(date)}
								disableFuture
								slotProps={{
									textField: {
										required: true,
										fullWidth: true,
									},
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='updatedBy'
								label='Updated By'
								variant='outlined'
								fullWidth
								value={formData.updatedBy}
								onChange={handleFormChange}
								error={formSubmitted && formData.updatedBy === ''}
								helperText={formSubmitted && formData.updatedBy === '' ? 'Updated by is required' : ''}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='updatedDate'
								label='Updated Date'
								defaultValue={dayjs()}
								value={dayjs(formData.updatedDate)}
								onChange={(date) => handleFormDateChange(date)}
								disableFuture
								slotProps={{
									textField: {
										required: true,
										fullWidth: true,
									},
								}}
							/>
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
		</LocalizationProvider>
	)
}

export default EventInputForm
