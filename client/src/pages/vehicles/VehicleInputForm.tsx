import React, { useState, useEffect, ChangeEvent, FormEvent, FC, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Vehicle } from '../../store/types/VehicleTypes'
import { updateVehicle, createVehicle, readVehicle } from '../../store/actions/mongodb/vehicleActions'
import {
	Container,
	Typography,
	TextField,
	Button,
	CircularProgress,
	Grid,
	Divider,
	Switch,
	FormControlLabel,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { HeaderContext } from '../../contexts/HeaderContext'
import { states, vehicleMakes, vehicleModels, vehicleColors } from '../../utils/valueProviders'
import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'
import { VehicleFormData } from '../../../types/vehicles/VehicleFormTypes'

interface VehicleInputFormProps {
	vehicleValues?: VehicleFormData
}

const VehicleInputForm: FC<VehicleInputFormProps> = ({ vehicleValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId?: string }>()
	// ----------------------------- States ----------------------------- //
	const [formData, setFormData] = useState<VehicleFormData>({
		_id: vehicleValues?._id,
		parentId: eventId || vehicleValues?.parentId || '',
		parentName: '',
		make: vehicleValues?.make || '',
		model: vehicleValues?.model || '',
		year: vehicleValues?.year || new Date().getFullYear(),
		color: vehicleValues?.color || '',
		occupantsDriver: vehicleValues?.occupantsDriver || '',
		occupantsPassengers: vehicleValues?.occupantsPassengers || [],
		registrationOwner: vehicleValues?.registrationOwner || '',
		registrationPlateNumber: vehicleValues?.registrationPlateNumber || '',
		registrationExpirationDate: vehicleValues?.registrationExpirationDate || new Date(),
		registrationState: vehicleValues?.registrationState || '',
		insurancePolicyNumber: vehicleValues?.insurancePolicyNumber || '',
		insuranceProvider: vehicleValues?.insuranceProvider || '',
		insuranceExpirationDate: vehicleValues?.insuranceExpirationDate || new Date(),
		insuranceInsured: vehicleValues?.insuranceInsured || false,
		stolen: vehicleValues?.stolen || false,
		illegalModificationsWasModified: vehicleValues?.illegalModificationsWasModified || false,
		illegalModificationsDescription: vehicleValues?.illegalModificationsDescription || '',
	})

	// Fetch vehicle details from Redux store
	useEffect(() => {
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
			returnPath: `/dashboard/event/${eventId}/vehicle`,
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
			setFormData({
				_id: vehicle._id!,
				parentId: vehicle.parent._id,
				parentName: vehicle.parent.name,
				make: vehicle.make,
				model: vehicle.model,
				year: vehicle.year,
				color: vehicle.color,
				occupantsDriver: vehicle.occupants.driver,
				occupantsPassengers: vehicle.occupants.passengers,
				registrationOwner: vehicle.registration.owner,
				registrationPlateNumber: vehicle.registration.plateNumber,
				registrationExpirationDate: vehicle.registration.expirationDate,
				registrationState: vehicle.registration.state,
				insurancePolicyNumber: vehicle.insurance?.policyNumber,
				insuranceProvider: vehicle.insurance?.provider,
				insuranceExpirationDate: vehicle.insurance?.expirationDate,
				insuranceInsured: vehicle.insurance?.insured ?? false,
				stolen: vehicle.stolen ?? false,
				illegalModificationsWasModified: vehicle.illegalModifications.wasModified ?? false,
				illegalModificationsDescription: vehicle.illegalModifications.description,
			})
		}
	}, [vehicle, vehicleId])

	// Handle form submission
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const vehicleData: Vehicle = {
				_id: formData._id || null,
				parent: {
					_id: formData.parentId,
					name: 'eventDB',
				},
				make: formData.make,
				model: formData.model,
				year: formData.year,
				color: formData.color,
				occupants: {
					driver: formData.occupantsDriver,
					passengers: formData.occupantsPassengers,
				},
				registration: {
					owner: formData.registrationOwner,
					plateNumber: formData.registrationPlateNumber,
					expirationDate: formData.registrationExpirationDate,
					state: formData.registrationState,
				},
				insurance: {
					policyNumber: formData.insurancePolicyNumber,
					provider: formData.insuranceProvider,
					expirationDate: formData.insuranceExpirationDate,
					insured: formData.insuranceInsured,
				},
				stolen: formData.stolen,
				illegalModifications: {
					wasModified: formData.illegalModificationsWasModified,
					description: formData.illegalModificationsDescription,
				},
			}

			// Check if parent ID is provided
			if (vehicleData.parent._id === null || vehicleData.parent._id === '') {
				console.error('Parent ID is required or vehicle data will be an orphaned record')
			} else if (vehicleData._id !== null) {
				dispatch(updateVehicle(vehicleData)) // Update vehicle
				console.log('Updating vehicle:', vehicleData)
				navigate(`/dashboard/event/${eventId}/vehicle`)
			} else {
				dispatch(createVehicle(vehicleData)) // Create vehicle
				console.log('Creating vehicle:', vehicleData)
				navigate(`/dashboard/event/${eventId}/vehicle`)
			}
		} catch (error: any) {
			console.error('Error:', error)
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

	// Handel toggle switch changes
	const handleFormSwitchChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target

		// Reset illegal modifications description if the switch is turned off
		if (name === 'illegalModificationsWasModified' && !checked) {
			setFormData((prevState) => ({
				...prevState,
				illegalModificationsDescription: '',
				[name]: checked,
			}))
		}
		// Reset insurance details if the switch is turned off
		else if (name === 'insuranceInsured' && !checked) {
			setFormData((prevState) => ({
				...prevState,
				insurancePolicyNumber: '',
				insuranceProvider: '',
				insuranceExpirationDate: new Date(),
				[name]: checked,
			}))
		}
		// For other fields, update the form data as usual
		else {
			setFormData((prevState) => ({
				...prevState,
				[name]: checked,
			}))
		}
	}

	// Handle form select changes
	const handleFormSelectChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		const { name, value } = event.target
		if (name === 'state') {
			// Handle state field separately
			setFormData((prevState) => ({
				...prevState,
				registrationState: value as string,
			}))
		} else {
			// For other fields, update the form data as usual
			setFormData((prevState) => ({
				...prevState,
				[name as string]: value,
			}))
		}
	}

	const handleFormConditionalSelectChange = (event: SelectChangeEvent<string>) => {
		const { name, value } = event.target

		// Reset model
		if (name === 'make') {
			setFormData((prevState) => ({
				...prevState,
				model: '', // Reset model
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

	// Handle form date changes
	const handleFormDateChange = (date: dayjs.Dayjs | null, fieldName: string) => {
		if (date) {
			setFormData((prevState) => ({
				...prevState,
				[fieldName]: date.toDate(),
			}))
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
								select
								value={formData.year}
								onChange={handleFormSelectChange}>
								{/* Generate the range of years */}
								{Array.from({ length: new Date().getFullYear() - 1885 + 1 }, (_, index) => (
									<MenuItem key={index} value={new Date().getFullYear() - index}>
										{new Date().getFullYear() - index}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='make-label'>Make</InputLabel>
								<Select
									required
									labelId='make-label'
									id='make'
									name='make'
									value={formData.make}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>Select a Vehcile Make</MenuItem>
									{vehicleMakes.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='model-label'>Model</InputLabel>
								<Select
									required
									labelId='model-label'
									id='model'
									name='model'
									value={formData.model}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>Select Vehicle Model</MenuItem>
									{formData.make &&
										vehicleModels[formData.make].map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='color-label'>Color</InputLabel>
								<Select
									required
									labelId='color-label'
									id='color'
									name='color'
									value={formData.color}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>Select a Vehcile Color</MenuItem>
									{vehicleColors.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Occupants
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							{/* Convert to select element populated with the entities from this event*/}
							<TextField
								required
								name='occupantsDriver'
								label='Driver'
								variant='outlined'
								fullWidth
								value={formData.occupantsDriver}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							{/* Convert to multi select element populated with the entities from this event*/}
							<TextField
								required
								name='occupantsPassengers'
								label='Passengers'
								variant='outlined'
								fullWidth
								value={formData.occupantsPassengers}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Registration
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							{/* Convert to select element populated with the entities from this event*/}
							<TextField
								required
								name='registrationOwner'
								label='Owner'
								variant='outlined'
								fullWidth
								value={formData.registrationOwner}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='registrationPlateNumber'
								label='Plate Number'
								variant='outlined'
								fullWidth
								value={formData.registrationPlateNumber}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={4}>
							<DatePicker
								name='registrationExpirationDate'
								label='Expiration Date'
								defaultValue={dayjs()}
								value={dayjs(formData.registrationExpirationDate)}
								onChange={(date) => handleFormDateChange(date, 'registrationExpirationDate')}
								disableFuture
								slotProps={{
									textField: {
										required: true,
										fullWidth: true,
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='registrationState'
								label='State'
								variant='outlined'
								fullWidth
								select
								value={formData.registrationState}
								onChange={handleFormSelectChange}>
								{states.map((state) => (
									<MenuItem key={state} value={state}>
										{state}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Insurance
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Switch
										name='insuranceInsured'
										checked={formData.insuranceInsured}
										onChange={handleFormSwitchChange('insuranceInsured')}
									/>
								}
								label='Insured'
							/>
						</Grid>
						{formData.insuranceInsured && (
							<>
								<Grid item xs={4}>
									<TextField
										name='insurancePolicyNumber'
										label='Policy Number'
										variant='outlined'
										fullWidth
										value={formData.insurancePolicyNumber}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										name='insuranceProvider'
										label='Provider'
										variant='outlined'
										fullWidth
										value={formData.insuranceProvider}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<DatePicker
										name='insuranceExpirationDate'
										label='Expiration Date'
										defaultValue={dayjs()}
										value={dayjs(formData.insuranceExpirationDate)}
										onChange={(date) => handleFormDateChange(date, 'insuranceExpirationDate')}
										disableFuture
										slotProps={{
											textField: {
												required: true,
												fullWidth: true,
											},
										}}
									/>
								</Grid>
							</>
						)}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								Legality
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<FormControlLabel
								control={<Switch name='stolen' checked={formData.stolen} onChange={handleFormSwitchChange('stolen')} />}
								label='Stolen'
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControlLabel
								control={
									<Switch
										name='illegalModificationsWasModified'
										checked={formData.illegalModificationsWasModified}
										onChange={handleFormSwitchChange('illegalModificationsWasModified')}
									/>
								}
								label='Modified'
							/>
						</Grid>
						{formData.illegalModificationsWasModified && (
							<Grid item xs={12}>
								<TextField
									name='illegalModificationsDescription'
									label='Modifications'
									variant='outlined'
									fullWidth
									value={formData.illegalModificationsDescription}
									onChange={handleFormChange}
								/>
							</Grid>
						)}
						<Grid item container xs={12} justifyContent='space-between'>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => navigate('/dashboard/event/${eventId}/vehicle')}>
								<CancelOutlined sx={{ marginRight: 1 }} />
								Cancel
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{vehicle?._id ? 'Save Changes' : 'Add Event'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default VehicleInputForm
