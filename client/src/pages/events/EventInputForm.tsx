import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { addEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../../shared/types/events/EventTypes'
import { RootState, AppDispatch } from 'store'

interface EventFormProps {
	initialValues?: Event
}

const EventInputForm: FC<EventFormProps> = ({ initialValues }) => {
	const dispatch = useDispatch<AppDispatch>()

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Event>()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const onSubmit: SubmitHandler<Event> = async (data) => {
		setLoading(true)
		setError(null)
		try {
			if (initialValues) {
				console.log('Update Event:', data)
				await dispatch(updateEvent(initialValues.id, data))
			} else {
				console.log('Add Event:', data)
				await dispatch(addEvent(data))
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
				<Controller
					name='reported.reporter'
					control={control}
					defaultValue={initialValues ? initialValues.reported.reporter : ''}
					render={({ field }) => (
						<TextField
							{...field}
							label='Reporter'
							variant='outlined'
							fullWidth
							error={!!errors.reported?.reporter}
							helperText={errors.reported?.reporter ? 'Reporter is required' : ''}
						/>
					)}
				/>
				<Controller
					name='reported.reportedDate'
					control={control}
					defaultValue={initialValues ? initialValues.reported.reportedDate : ''}
					render={({ field }) => (
						<TextField
							{...field}
							label='Reported Date'
							type='datetime-local'
							variant='outlined'
							fullWidth
							error={!!errors.reported?.reportedDate}
							helperText={errors.reported?.reportedDate ? 'Reported Date is required' : ''}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					)}
				/>
				{/* Repeat this Controller block for other fields */}
				<Button type='submit' variant='contained' color='primary'>
					{initialValues ? 'Save Changes' : 'Add Event'}
				</Button>
			</form>
		</Container>
	)
}

export default EventInputForm
