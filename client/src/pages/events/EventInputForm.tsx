import React, { useState, FC, useContext, useEffect, FormEvent, ChangeEvent } from 'react'
// @ts-ignore
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	Container,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Grid,
	Divider,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	SelectChangeEvent,
	Chip,
	OutlinedInput,
	Checkbox,
	ListItemText,
} from '@mui/material'
import { createEvent, updateEvent, readEvent } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'
import { EventFormData } from '../../../types/events/EventFormTypes'
import { AppDispatch, RootState } from 'store'
import { HeaderContext } from '../../contexts/HeaderContext'
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { eventTypes, eventSubTypes, tags, methodsOfReceipt, states, countries } from '../../utils/valueProviders'

interface EventInputFormProps {
	eventValues?: EventFormData
}

const EventInputForm: FC<EventInputFormProps> = ({ eventValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId } = useParams<string>()

	useEffect(() => {
		console.log('eventID: ', eventId)
		// Fetch event details from Redux store
		if (eventId) {
			dispatch(readEvent(eventId))
		}
	}, [dispatch, eventId])

	// Access event details from Redux store
	const { event, loading, error } = useSelector((state: RootState) => state.events)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: eventValues ? 'Update Event' : 'Add Event',
			subheader: eventValues ? 'Update an existing event' : 'Add a new event',
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>All fields marker with an asterisk (*) are required</Typography>
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
	}, [setHeaderData])

	const [formData, setFormData] = useState<EventFormData>({
		_id: eventValues?._id,
		status: eventValues?.status || 'pending',
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
		zip: eventValues?.zip || null,
		country: eventValues?.country || '',
		county: eventValues?.county || '',
		state: eventValues?.state || '',
	})
	const [formSubmitted, setFormSubmitted] = useState(false)

	useEffect(() => {
		if (event) {
			// If event is available, populate the form with its data
			setFormData({
				_id: event._id!,
				status: event.status,
				reporter: event.reported.reporter,
				reportedDate: event.reported.reportedDate,
				updatedBy: event.updated.updatedBy,
				updatedDate: event.updated.updatedDate,
				submittedBy: event.submitted.submittedBy,
				submittedDate: event.submitted.submittedDate,
				eventType: event.type.eventType,
				eventSubType: event.type.eventSubType,
				title: event.details.title,
				description: event.details.description,
				tagging: event.details.tagging,
				methodOfReceipt: event.details.methodOfReceipt,
				address: event.location.address,
				city: event.location.city,
				zip: event.location.zip,
				country: event.location.country,
				county: event.location.county,
				state: event.location.state,
			})
		}
	}, [event])

	const handleFormChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name as string]: value,
		}))
	}

	const handleFormSelectChange = (event: SelectChangeEvent<string>) => {
		const { name, value } = event.target

		// Reset eventSubType and tagging when a new eventType is selected
		if (name === 'eventType') {
			setFormData((prevState) => ({
				...prevState,
				eventSubType: '', // Reset eventSubType
				tagging: [], // Reset tagging
				[name as string]: value,
			}))
		}
		// Reset tagging when a new eventSubType is selected
		else if (name === 'eventSubType') {
			setFormData((prevState) => ({
				...prevState,
				tagging: [], // Reset tagging
				[name as string]: value,
			}))
		}
		// For other fields, just update the form data as usual
		else {
			setFormData((prevState) => ({
				...prevState,
				[name as string]: value,
			}))
		}
	}

	const handleFormMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name as string]: value,
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

		console.log('Form Data: ', formData)

		try {
			const eventData: Event = {
				_id: formData._id || null,
				status: formData.status || 'pending',
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

			console.log('Event Data: ', eventData)

			if (eventData._id !== null) {
				console.log('Update Event (Form):', eventData)
				await dispatch(updateEvent(eventData))
				// nagivate back to the dashboard after updating the event
				navigate('/dashboard')
			} else {
				console.log('Add Event (Form):', eventData)
				await dispatch(createEvent(eventData))
				// nagivate back to the dashboard after creating the event
				navigate('/dashboard')
			}
		} catch (error: any) {
			console.error('Error:', error.message)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				{loading && <CircularProgress />}
				{typeof error === 'object' && Object.keys(error).length !== 0 && (
					<Typography color='error' variant='h6'>
						Error: {error.toString()}
					</Typography>
				)}
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
								required
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
								required
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
								required
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
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								What
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='eventType-label'>Event Type</InputLabel>
								<Select
									required
									labelId='eventType-label'
									id='eventType'
									name='eventType'
									value={formData.eventType}
									onChange={handleFormSelectChange}
									error={formSubmitted && formData.eventType === ''}>
									<MenuItem value=''>Select Event Type</MenuItem>
									{eventTypes.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
								{formSubmitted && formData.eventType === '' && (
									<Typography variant='caption' color='error'>
										Event type is required
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='eventSubType-label'>Event Sub-Type</InputLabel>
								<Select
									required
									labelId='eventSubType-label'
									id='eventSubType'
									name='eventSubType'
									value={formData.eventSubType}
									onChange={handleFormSelectChange}
									error={formSubmitted && formData.eventSubType === ''}>
									<MenuItem value=''>Select Event Sub-Type</MenuItem>
									{formData.eventType &&
										eventSubTypes[formData.eventType].map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
								</Select>
								{formSubmitted && formData.eventSubType === '' && (
									<Typography variant='caption' color='error'>
										Event Sub-Type is required
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='tagging-label'>Tags</InputLabel>
								<Select
									required
									labelId='tagging-label'
									id='tagging'
									multiple
									name='tagging'
									value={formData.tagging}
									onChange={handleFormMultiSelectChange}
									input={<OutlinedInput label='Tag' />}
									renderValue={(selected) => (
										<div>
											{selected.map((value) => (
												<Chip key={value} label={value} style={{ marginRight: 5 }} />
											))}
										</div>
									)}>
									{formData.eventType &&
										eventSubTypes[formData.eventType] &&
										eventSubTypes[formData.eventType].map((tag, index) => (
											<MenuItem key={index} value={tag}>
												<Checkbox checked={formData.tagging.indexOf(tag) > -1} />
												<ListItemText primary={tag} />
											</MenuItem>
										))}
								</Select>
								{formSubmitted && formData.tagging.length === 0 && (
									<Typography variant='caption' color='error'>
										Tags are required
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='methodOfReceipt-label'>Method of Receipt</InputLabel>
								<Select
									required
									labelId='methodOfReceipt-label'
									id='methodOfReceipt'
									name='methodOfReceipt'
									value={formData.methodOfReceipt}
									onChange={handleFormSelectChange}
									error={formSubmitted && formData.methodOfReceipt === ''}>
									<MenuItem value=''>Select Method of Receipt</MenuItem>
									{methodsOfReceipt.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
								{formSubmitted && formData.methodOfReceipt === '' && (
									<Typography variant='caption' color='error'>
										Method of receipt is required
									</Typography>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Why
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								name='title'
								label='Title'
								variant='outlined'
								fullWidth
								value={formData.title}
								onChange={handleFormChange}
								error={formSubmitted && formData.title === ''}
								helperText={formSubmitted && formData.title === '' ? 'Title is required' : ''}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								name='description'
								label='Description'
								variant='outlined'
								fullWidth
								multiline
								rows={8}
								value={formData.description}
								onChange={handleFormChange}
								error={formSubmitted && formData.description === ''}
								helperText={formSubmitted && formData.description === '' ? 'Description is required' : ''}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Where
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										name='address'
										label='Address'
										variant='outlined'
										fullWidth
										value={formData.address}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={5}>
									<TextField
										required
										name='city'
										label='City'
										variant='outlined'
										fullWidth
										value={formData.city}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										required
										name='state'
										label='State'
										variant='outlined'
										fullWidth
										select
										value={formData.state}
										onChange={handleFormChange}
										error={formSubmitted && formData.state === ''}
										helperText={formSubmitted && formData.state === '' ? 'State is required' : ''}>
										{states.map((state) => (
											<MenuItem key={state} value={state}>
												{state}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={3}>
									<TextField
										required
										name='zip'
										label='Zip Code'
										variant='outlined'
										fullWidth
										placeholder='Enter ZIP'
										value={formData.zip || ''}
										onChange={handleFormChange}
										error={formSubmitted && (!formData.zip || isNaN(formData.zip as number))}
										helperText={
											formSubmitted && (!formData.zip || isNaN(formData.zip as number))
												? !formData.zip
													? 'Zip code is required'
													: 'Zip code must be a number'
												: ''
										}
										inputProps={{
											maxLength: 5, // Set maximum character limit for 5-digit Zip codes
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name='county'
										label='County'
										variant='outlined'
										fullWidth
										value={formData.county}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										name='country'
										label='Country'
										variant='outlined'
										fullWidth
										select
										value={formData.country}
										onChange={handleFormChange}
										error={formSubmitted && formData.country === ''}
										helperText={formSubmitted && formData.country === '' ? 'Country is required' : ''}>
										{countries.map((country) => (
											<MenuItem key={country} value={country}>
												{country}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
						</Grid>
						<Grid item container xs={12} justifyContent='space-between'>
							<Button variant='contained' color='secondary' onClick={() => navigate('/dashboard')}>
								<CancelOutlined sx={{ marginRight: 1 }} />
								Cancel
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{event?._id ? 'Save Changes' : 'Add Event'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default EventInputForm
