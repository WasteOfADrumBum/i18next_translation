import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Typography, TextField, Button, CircularProgress, MenuItem } from '@mui/material'
import { useForm, FieldValues, Controller, SubmitHandler } from 'react-hook-form'
import { addEvent, updateEvent } from '../../store/actions/eventActions'
import { Event } from '../../../../shared/types/events/EventTypes'
import { RootState, AppDispatch } from 'store'

interface EventFormProps {
	initialValues?: Event
}

const EventInputForm: FC<EventFormProps> = ({ initialValues }) => {
	const dispatch = useDispatch<AppDispatch>()

	const {
		register,
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
				{/* Form Inputs Here */}
				<Button type='submit' variant='contained' color='primary'>
					{initialValues ? 'Save Changes' : 'Add Event'}
				</Button>
			</form>
		</Container>
	)
}

export default EventInputForm
