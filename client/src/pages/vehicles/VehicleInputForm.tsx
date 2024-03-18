import React, { useState, useEffect, ChangeEvent, FormEvent, FC, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Vehicle, initialState } from '../../store/types/VehicleTypes'
import { updateVehicle, createVehicle, readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { Container, Typography, TextField, Button, CircularProgress, Grid, Divider } from '@mui/material'
import { HeaderContext } from '../../contexts/HeaderContext'

interface VehicleInputFormProps {
	vehicleValues?: Vehicle
}

const VehicleInputForm: FC<VehicleInputFormProps> = ({ vehicleValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId?: string }>()
	// ----------------------------- States ----------------------------- //
	const [formData, setFormData] = useState<Vehicle>({
		_id: vehicleValues?._id || '',
		parent: {
			_id: eventId || '',
			name: '',
		},
		make: vehicleValues?.make || '',
		model: vehicleValues?.model || '',
		year: vehicleValues?.year || 0,
		color: vehicleValues?.color || '',
		occupants: {
			driver: vehicleValues?.occupants.driver || '',
			passengers: vehicleValues?.occupants.passengers || [],
		},
		registration: {
			owner: vehicleValues?.registration.owner || '',
			plateNumber: vehicleValues?.registration.plateNumber || '',
			expirationDate: vehicleValues?.registration.expirationDate || new Date(),
			state: vehicleValues?.registration.state || '',
		},
		insurance: {
			policyNumber: vehicleValues?.insurance?.policyNumber || '',
			provider: vehicleValues?.insurance?.provider || '',
			expirationDate: vehicleValues?.insurance?.expirationDate || new Date(),
			insured: vehicleValues?.insurance?.insured || false,
		},
		stolen: vehicleValues?.stolen || false,
		illegalModifications: {
			wasModified: vehicleValues?.illegalModifications?.wasModified || false,
			description: vehicleValues?.illegalModifications?.description || '',
		},
	})

	// Fetch vehicle details from Redux store
	useEffect(() => {
		console.log('vehcileID:', vehicleId)
		// Fetch vehilce details from Redux store
		if (vehicleId) {
			dispatch(readVehicle(vehicleId))
		}
	}, [dispatch, vehicleId])

	// Update form data when vehicle details are fetched from Redux store
	const { loading, error, vehicle } = useSelector((state: RootState) => state.vehicles)

	// Update header data when component mounts
	useEffect(() => {
		setHeaderData({
			header: vehicleValues ? 'Update Vehicle' : 'Add Vehicle',
			subheader: vehicleValues ? 'Update an existing vehicle' : 'Add a new vehicle',
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>All fields marker with an asterisk (*) are required</Typography>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: `/dashboard/event/${eventId}/entity`,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: '',
				subheader: '',
				extraContent: null,
				returnButton: true,
			})
		}
	}, [setHeaderData])

	// Update form data when vehicle details are fetched from Redux store
	useEffect(() => {
		if (vehicleId && vehicle) {
			setFormData(vehicle)
		}
	}, [vehicle])

	// Handle form submission
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const vehicleData = {
				...formData,
				parent: {
					_id: eventId!,
					name: 'eventDB',
				},
			}

			// Check if parent ID is provided
			if (vehicleData.parent._id === null || vehicleData.parent._id === '') {
				console.error('Parent ID is required or vehicle data will be an orphaned reccord')
			} else if (vehicleData._id !== null) {
				dispatch(updateVehicle(vehicleData)) // Update vehicle
				navigate(`/dashboard/event/${eventId}/vehicle`)
			} else {
				dispatch(createVehicle(vehicleData)) // Create vehicle
				navigate(`/dashboard/event/${eventId}/vehicle`)
			}
		} catch (error: any) {
			console.log('Error:', error)
		}
	}

	// Handle form field changes
	const handleFormChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name as string]: value,
		}))
	}

	return (
		<Container>
			{loading && <CircularProgress />}
			{typeof error === 'object' && Object.keys(error).length !== 0 && (
				<Typography color='error' variant='h6'>
					Error: {error.toString()}
				</Typography>
			)}
			<form onSubmit={onSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Description
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							name='year'
							label='Year'
							variant='outlined'
							fullWidth
							value={formData.year}
							onChange={handleFormChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							name='make'
							label='Make'
							variant='outlined'
							fullWidth
							value={formData.make}
							onChange={handleFormChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							name='model'
							label='Model'
							variant='outlined'
							fullWidth
							value={formData.model}
							onChange={handleFormChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							name='color'
							label='Color'
							variant='outlined'
							fullWidth
							value={formData.color}
							onChange={handleFormChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Occupants
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Registration
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Insurance
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Legality
						</Typography>
						<Divider />
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}

export default VehicleInputForm
