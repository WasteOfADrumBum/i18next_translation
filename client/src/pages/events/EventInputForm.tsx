import React, { useState, FC, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	Container,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	Select,
	FormHelperText,
	FormControl,
	InputLabel,
	Divider,
} from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { addEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../../shared/types/events/EventTypes'
import { EventFormData } from '../../../../shared/types/events/EventFormTypes'
import { AppDispatch } from 'store'
import { useNavigate } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { states } from '../../utils/valueProviders'
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

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<EventFormData>()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onSubmit: SubmitHandler<EventFormData> = async (data: EventFormData) => {
		setLoading(true)
		setError(null)
		try {
			const eventData: Event = {
				id: data.id || '', // Provide a default value for id
				reported: {
					reporter: data.reporter,
					reportedDate: data.reportedDate,
				},
				updated: {
					updatedBy: data.updatedBy,
					updatedDate: data.updatedDate,
				},
				submitted: {
					submittedBy: data.submittedBy,
					submittedDate: data.submittedDate,
				},
				type: {
					eventType: data.eventType,
					eventSubType: data.eventSubType,
				},
				details: {
					title: data.title,
					description: data.description,
					tagging: data.tagging,
					methodOfReceipt: data.methodOfReceipt,
				},
				location: {
					address: data.address,
					city: data.city,
					zip: data.zip,
					country: data.country,
					county: data.county,
					state: data.state,
				},
			}

			if (eventValues) {
				console.log('Update Event:', eventData)
				await dispatch(updateEvent(String(eventData.id), eventData))
			} else {
				console.log('Add Event:', eventData)
				await dispatch(addEvent(eventData))
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography variant='h4' mb={1}>
							Who
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h4' mb={1}>
							When
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='reporter'
							control={control}
							defaultValue={eventValues ? eventValues.reporter : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Reporter'
									variant='outlined'
									fullWidth
									error={!!errors.reporter}
									helperText={errors.reporter ? 'Reporter is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='reportedDate'
							control={control}
							defaultValue={eventValues ? eventValues.reportedDate : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Reported Date'
									variant='outlined'
									fullWidth
									error={!!errors.reportedDate}
									helperText={errors.reportedDate ? 'Reported Date is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='updatedBy'
							control={control}
							defaultValue={eventValues ? eventValues.updatedBy : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Updated By'
									variant='outlined'
									fullWidth
									error={!!errors.updatedBy}
									helperText={errors.updatedBy ? 'Updated By is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='updatedDate'
							control={control}
							defaultValue={eventValues ? eventValues.updatedDate : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Updated Date'
									variant='outlined'
									fullWidth
									error={!!errors.updatedDate}
									helperText={errors.updatedDate ? 'Updated Date is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='submittedBy'
							control={control}
							defaultValue={eventValues ? eventValues.submittedBy : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Submitted By'
									variant='outlined'
									fullWidth
									error={!!errors.submittedBy}
									helperText={errors.submittedBy ? 'Submitted By is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='submittedDate'
							control={control}
							defaultValue={eventValues ? eventValues.submittedDate : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Submitted Date'
									variant='outlined'
									fullWidth
									error={!!errors.submittedDate}
									helperText={errors.submittedDate ? 'Submitted Date is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' mb={1}>
							What
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='eventType'
							control={control}
							defaultValue={eventValues ? eventValues.eventType : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Event Type'
									variant='outlined'
									fullWidth
									error={!!errors.eventType}
									helperText={errors.eventType ? 'Event Type is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='eventSubType'
							control={control}
							defaultValue={eventValues ? eventValues.eventSubType : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Event Sub Type'
									variant='outlined'
									fullWidth
									error={!!errors.eventSubType}
									helperText={errors.eventSubType ? 'Event Sub Type is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='tagging'
							control={control}
							defaultValue={eventValues ? eventValues.tagging : []}
							render={({ field }) => (
								<TextField
									{...field}
									label='Tagging'
									variant='outlined'
									fullWidth
									error={!!errors.tagging}
									helperText={errors.tagging ? 'Tagging is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='methodOfReceipt'
							control={control}
							defaultValue={eventValues ? eventValues.methodOfReceipt : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Method Of Receipt'
									variant='outlined'
									fullWidth
									error={!!errors.methodOfReceipt}
									helperText={errors.methodOfReceipt ? 'Method Of Receipt is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name='title'
							control={control}
							defaultValue={eventValues ? eventValues.title : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Title'
									variant='outlined'
									fullWidth
									error={!!errors.title}
									helperText={errors.title ? 'Title is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Controller
							name='description'
							control={control}
							defaultValue={eventValues ? eventValues.description : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Description'
									variant='outlined'
									multiline
									rows={4}
									fullWidth
									error={!!errors.description}
									helperText={errors.description ? 'Description is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' mb={1}>
							Where
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='address'
							control={control}
							defaultValue={eventValues ? eventValues.address : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Address'
									variant='outlined'
									fullWidth
									error={!!errors.address}
									helperText={errors.address ? 'Address is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='city'
							control={control}
							defaultValue={eventValues ? eventValues.city : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='City'
									variant='outlined'
									fullWidth
									error={!!errors.city}
									helperText={errors.city ? 'City is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='zip'
							control={control}
							defaultValue={eventValues ? eventValues.zip : 0}
							render={({ field }) => (
								<TextField
									{...field}
									label='Zip'
									variant='outlined'
									fullWidth
									error={!!errors.zip}
									helperText={errors.zip ? 'Zip is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='country'
							control={control}
							defaultValue={eventValues ? eventValues.country : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='Country'
									variant='outlined'
									fullWidth
									error={!!errors.country}
									helperText={errors.country ? 'Country is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Controller
							name='county'
							control={control}
							defaultValue={eventValues ? eventValues.county : ''}
							render={({ field }) => (
								<TextField
									{...field}
									label='County'
									variant='outlined'
									fullWidth
									error={!!errors.county}
									helperText={errors.county ? 'County is required' : ''}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={6}>
						<FormControl variant='outlined' fullWidth error={!!errors.state}>
							<InputLabel id='state-label'>State</InputLabel>
							<Controller
								name='state'
								control={control}
								defaultValue={eventValues ? eventValues.state : ''}
								render={({ field }) => (
									<Select {...field} label='State'>
										{states.map((state) => (
											<MenuItem key={state} value={state}>
												{state}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							<FormHelperText>{errors.state ? 'State is required' : ''}</FormHelperText>
						</FormControl>
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
