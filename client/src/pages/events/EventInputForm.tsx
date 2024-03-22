import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'
import {
	Button,
	Checkbox,
	Chip,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { EventFormData } from '../../../types/events/EventFormTypes'
import { HeaderContext } from '../../contexts/HeaderContext'
import translations from '../../i18n/locales'
import { createEvent, readEvent, updateEvent } from '../../store/actions/mongodb/eventActions'
import { Event } from '../../store/types/EventTypes'
import { countries, eventSubTypes, eventTypes, methodsOfReceipt, states } from '../../utils'

const eventHeaderT = translations.pages.events.header
const eventFieldT = translations.pages.events.fields
const eventButtonT = translations.pages.events.buttons
const interrogatives = translations.common.interrogatives
const requiredDisclaimer = translations.common.forms.requiredDisclaimer
const statusIndicator = translations.common.statusIndicator
const commonButton = translations.common.buttons

interface EventInputFormProps {
	eventValues?: EventFormData
}

const EventInputForm: FC<EventInputFormProps> = ({ eventValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId } = useParams<string>()
	// ----------------------------- States ----------------------------- //
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

	// Fetch event details from Redux store
	useEffect(() => {
		if (eventId) {
			dispatch(readEvent(eventId))
		}
	}, [dispatch, eventId])

	// Access event details from Redux store
	const { event, loading, error } = useSelector((state: RootState) => state.events)

	// Update header data when component mounts
	useEffect(() => {
		setHeaderData({
			header: eventValues ? eventHeaderT.title.edit : eventHeaderT.title.new,
			subheader: eventValues ? eventHeaderT.subtitle.edit : eventHeaderT.subtitle.new,
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>{requiredDisclaimer}</Typography>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: '/dashboard',
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

	// Update form data when event details are fetched from Redux store
	useEffect(() => {
		if (eventId && event) {
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

	// Handle form field changes
	const handleFormChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name as string]: value,
		}))
	}

	// Handle form select changes
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

	// Handle form multi-select changes
	const handleFormMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name as string]: value,
		}))
	}

	// Handle form date changes
	const handleFormDateChange = (date: dayjs.Dayjs | null, fieldName: string) => {
		if (date) {
			setFormData((prevState) => ({
				...prevState,
				[fieldName]: date.toDate(),
			}))
		}
	}

	// Handle form submission
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault() // Prevent default form submission behavior

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

			if (eventData._id !== null) {
				await dispatch(updateEvent(eventData)) // Dispatch updateEvent action to update existing event
				navigate('/dashboard') // Redirect to dashboard after updating event
			} else {
				await dispatch(createEvent(eventData)) // Dispatch createEvent action to add new event
				navigate('/dashboard') // Redirect to dashboard after adding event
			}
		} catch (error: unknown) {
			console.error('Error:', (error as Error).message)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				{loading && <CircularProgress />}
				{typeof error === 'object' && Object.keys(error).length !== 0 && (
					<Typography color='error' variant='h6'>
						{statusIndicator.error}: {error.toString()}
					</Typography>
				)}
				<form onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{interrogatives.who}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{interrogatives.when}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<TextField
								required
								name='reporter'
								label={eventFieldT.reported.reporter}
								variant='outlined'
								fullWidth
								value={formData.reporter}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='reportedDate'
								label={eventFieldT.reported.reportedDate}
								defaultValue={dayjs()}
								value={dayjs(formData.reportedDate)}
								onChange={(date) => handleFormDateChange(date, 'reportedDate')}
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
								label={eventFieldT.submitted.submittedBy}
								variant='outlined'
								fullWidth
								value={formData.submittedBy}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='submittedDate'
								label={eventFieldT.submitted.submittedDate}
								defaultValue={dayjs()}
								value={dayjs(formData.submittedDate)}
								onChange={(date) => handleFormDateChange(date, 'submittedDate')}
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
								label={eventFieldT.updated.updatedBy}
								variant='outlined'
								fullWidth
								value={formData.updatedBy}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<DatePicker
								name='updatedDate'
								label={eventFieldT.updated.updatedDate}
								defaultValue={dayjs()}
								value={dayjs(formData.updatedDate)}
								onChange={(date) => handleFormDateChange(date, 'updatedDate')}
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
								{interrogatives.what}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='eventType-label'>{eventFieldT.type.eventType}</InputLabel>
								<Select
									required
									labelId='eventType-label'
									id='eventType'
									name='eventType'
									value={formData.eventType}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select Event Type</MenuItem>
									{eventTypes.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='eventSubType-label'>{eventFieldT.type.eventSubType}</InputLabel>
								<Select
									required
									labelId='eventSubType-label'
									id='eventSubType'
									name='eventSubType'
									value={formData.eventSubType}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select Event Sub-Type</MenuItem>
									{formData.eventType &&
										eventSubTypes[formData.eventType].map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='tagging-label'>{eventFieldT.details.tagging}</InputLabel>
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
												<Chip key={value} label={value} sx={{ marginRight: 5 }} />
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
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='methodOfReceipt-label'>{eventFieldT.details.methodOfReceipt}</InputLabel>
								<Select
									required
									labelId='methodOfReceipt-label'
									id='methodOfReceipt'
									name='methodOfReceipt'
									value={formData.methodOfReceipt}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select Method of Receipt</MenuItem>
									{methodsOfReceipt.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{interrogatives.why}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								name='title'
								label={eventFieldT.details.title}
								variant='outlined'
								fullWidth
								value={formData.title}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								name='description'
								label={eventFieldT.details.description}
								variant='outlined'
								fullWidth
								multiline
								rows={8}
								value={formData.description}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{interrogatives.where}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										name='address'
										label={eventFieldT.location.address}
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
										label={eventFieldT.location.city}
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
										label={eventFieldT.location.state}
										variant='outlined'
										fullWidth
										select
										value={formData.state}
										onChange={handleFormChange}>
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
										label={eventFieldT.location.zip}
										variant='outlined'
										fullWidth
										placeholder='Enter ZIP'
										value={formData.zip || ''}
										onChange={handleFormChange}
										helperText={!formData.zip || isNaN(formData.zip as number) ? 'Zip code must be a number' : ''}
										inputProps={{
											maxLength: 5, // Set maximum character limit for 5-digit Zip codes
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										name='county'
										label={eventFieldT.location.county}
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
										label={eventFieldT.location.country}
										variant='outlined'
										fullWidth
										select
										value={formData.country}
										onChange={handleFormChange}>
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
								{commonButton.cancel}
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{event?._id ? eventButtonT.edit : eventButtonT.new}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default EventInputForm
