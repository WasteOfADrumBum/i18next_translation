import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Typography, TextField, Button, CircularProgress, MenuItem } from '@mui/material'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { addEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../../shared/types/events/EventTypes'

interface EventFormProps {
	initialValues?: Event
}

const EventInputForm: FC<EventFormProps> = ({ initialValues }) => {
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FieldValues>()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onSubmit = async (data: Event) => {
		setLoading(true)
		setError(null)
		try {
			if (initialValues) {
				console.log('Update Event:', data)
				await dispatch(updateEvent(initialValues.id, data))
			} else {
				console.log('Add Event:', data)
				await dispatch(addEvent(data) as unknown as UnknownAction)
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
				<Typography variant='h4'>{initialValues ? 'Update Event' : 'Add Event'}</Typography>
				<TextField
					{...register('eventDate', { required: true })}
					id='eventDate'
					label='Event Date'
					type='datetime-local'
					defaultValue={initialValues ? initialValues.eventDate : ''}
					error={!!errors.eventDate}
					helperText={errors.eventDate && 'Event Date is required'}
					fullWidth
					margin='normal'
				/>
				<Controller
					name='eventType'
					control={control}
					defaultValue={initialValues ? initialValues.eventType : ''}
					render={({ field }) => (
						<TextField {...field} id='eventType' select label='Event Type' fullWidth margin='normal'>
							<MenuItem value='type1'>Type 1</MenuItem>
							<MenuItem value='type2'>Type 2</MenuItem>
						</TextField>
					)}
				/>
				<Controller
					name='eventSubType'
					control={control}
					defaultValue={initialValues ? initialValues.eventSubType : ''}
					render={({ field }) => (
						<TextField {...field} id='eventSubType' select label='Event SubType' fullWidth margin='normal'>
							<MenuItem value='subType1'>SubType 1</MenuItem>
							<MenuItem value='subType2'>SubType 2</MenuItem>
						</TextField>
					)}
				/>
				<TextField {...register('location.address')} id='locationAddress' label='Address' fullWidth margin='normal' />
				<TextField {...register('location.city')} id='locationCity' label='City' fullWidth margin='normal' />
				<TextField {...register('reporter')} id='reporter' label='Reporter' fullWidth margin='normal' />
				<TextField
					{...register('recordedDate', { required: true })}
					id='recordedDate'
					label='Recorded Date'
					type='datetime-local'
					defaultValue={initialValues ? initialValues.recordedDate : ''}
					error={!!errors.recordedDate}
					helperText={errors.recordedDate && 'Recorded Date is required'}
					fullWidth
					margin='normal'
				/>
				<TextField
					{...register('lastUpdatedBy')}
					id='lastUpdatedBy'
					label='Last Updated By'
					fullWidth
					margin='normal'
				/>
				<TextField
					{...register('lastUpdatedDate', { required: true })}
					id='lastUpdatedDate'
					label='Last Updated Date'
					type='datetime-local'
					defaultValue={initialValues ? initialValues.lastUpdatedDate : new Date().toISOString().slice(0, 16)}
					error={!!errors.lastUpdatedDate}
					helperText={errors.lastUpdatedDate && 'Last Updated Date is required'}
					fullWidth
					margin='normal'
				/>
				<TextField
					{...register('status')}
					id='status'
					label='Status'
					defaultValue={initialValues ? initialValues.status : 'Pending'}
					fullWidth
					margin='normal'
					disabled={initialValues ? true : false} // Disable status field for edit
				/>
				<Button type='submit' variant='contained' color='primary'>
					{initialValues ? 'Save Changes' : 'Add Event'}
				</Button>
			</form>
		</Container>
	)
}

export default EventInputForm
