import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'
import {
	Button,
	Checkbox,
	Chip,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { VehicleFormData } from '../../../types/vehicles/VehicleFormTypes'
import { HeaderContext } from '../../contexts'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { createVehicle, readVehicle, updateVehicle } from '../../store/actions/mongodb/vehicleActions'
import { Vehicle } from '../../store/types/VehicleTypes'
import { getStates, getVehicleColors, getVehicleMakes, getVehicleModels } from '../../utils'

interface VehicleInputFormProps {
	vehicleValues?: VehicleFormData
}

interface EntityListItem {
	_id: string | null
	parent: {
		_id: string | null
		name: string | null
	}
	type: string | null
	person: {
		name: {
			first: string | null
			middle: string | null
			last: string | null
			suffix: string | null
		}
	}
	organization: {
		contactName: string | null
		legal: {
			legalName: string | null
		}
	}
}

const VehicleInputForm: FC<VehicleInputFormProps> = ({ vehicleValues }) => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId?: string }>()
	// ----------------------------- States ----------------------------- //
	const [vehicleMakes, setVehicleMakes] = useState<{ key: string; value: string }[]>([])
	const [vehicleModels, setVehicleModels] = useState<{ [key: string]: string[] }>({})
	const [vehicleColors, setVehicleColors] = useState<{ key: string; value: string }[]>([])
	const [states, setStates] = useState<{ key: string; value: string }[]>([])
	const [formData, setFormData] = useState<VehicleFormData>({
		_id: vehicleValues?._id,
		parentId: eventId || vehicleValues?.parentId || '',
		parentName: '',
		make: vehicleValues?.make || '',
		model: vehicleValues?.model || '',
		year: vehicleValues?.year || new Date().getFullYear(),
		color: vehicleValues?.color || '',
		vin: vehicleValues?.vin || '',
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
	const [entities, setEntities] = useState<EntityListItem[]>([])

	// Fetch vehicle details from Redux store
	useEffect(() => {
		// Fetch vehilce details from Redux store
		if (vehicleId) {
			dispatch(readVehicle(vehicleId))
		}
	}, [dispatch, vehicleId])

	// Update form data when vehicle details are fetched from Redux store
	const { loading, error, vehicle } = useSelector((state: RootState) => state.vehicles)

	// Fetch entity data from Redux store based on the event ID
	useEffect(() => {
		if (eventId) {
			dispatch(getEntities())
		}
	}, [dispatch, eventId])

	// Update form data when vehicle details are fetched from Redux store
	const { entities: entitiesData } = useSelector((state: RootState) => state.entities)

	// Update entities list when component mounts
	useEffect(() => {
		if (entitiesData) {
			const eventEntities = entitiesData.filter((entity) => entity.parent._id === eventId)
			const entitiesList: EntityListItem[] = eventEntities.map((entity) => {
				if (entity.type === 'Person') {
					return {
						_id: entity._id,
						parent: entity.parent,
						type: entity.type,
						person: entity.person,
						organization: { contactName: null, legal: { legalName: null } },
					}
				} else if (entity.type === 'Organization') {
					return {
						_id: entity._id,
						parent: entity.parent,
						type: entity.type,
						person: { name: { first: null, middle: null, last: null, suffix: null } },
						organization: entity.organization,
					}
				} else {
					return {
						_id: entity._id,
						parent: entity.parent,
						type: entity.type,
						person: { name: { first: null, middle: null, last: null, suffix: null } },
						organization: { contactName: null, legal: { legalName: null } },
					}
				}
			})
			setEntities(entitiesList)
		}
	}, [entitiesData, eventId])

	// Update header data when component mounts
	useEffect(() => {
		setHeaderData({
			header: vehicleValues ? t('pages.vehicles.header.title.edit') : t('pages.vehicles.header.title.new'),
			subheader: vehicleValues ? t('pages.vehicles.header.subtitle.edit') : t('pages.vehicles.header.subtitle.new'),
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>{t('common.forms.requiredDisclaimer')}</Typography>
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
	}, [eventId, setHeaderData, vehicleValues, t])

	// Update form data when vehicle details are fetched from Redux store
	useEffect(() => {
		if (vehicleId && vehicle) {
			setFormData({
				_id: vehicle._id || undefined,
				parentId: vehicle.parent._id || null,
				parentName: vehicle.parent.name,
				make: vehicle.make,
				model: vehicle.model,
				year: vehicle.year,
				color: vehicle.color,
				vin: vehicle.vin,
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
				vin: formData.vin,
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
				console.error(t('errors:parentIdRequired'))
			} else if (vehicleData._id !== null) {
				dispatch(updateVehicle(vehicleData)) // Update vehicle
				console.log('Updating vehicle:', vehicleData)
				navigate(`/dashboard/event/${eventId}/vehicle`)
			} else {
				dispatch(createVehicle(vehicleData)) // Create vehicle
				console.log('Creating vehicle:', vehicleData)
				navigate(`/dashboard/event/${eventId}/vehicle`)
			}
		} catch (error: unknown) {
			console.error('Error:', (error as Error).message)
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
		// Handle state field separately
		if (name === 'state') {
			setFormData((prevState) => ({
				...prevState,
				registrationState: value as string,
			}))
		}
		// For other fields, update the form data as usual
		else {
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

	// Handle form select changes
	const handleFormEntitySelectChange = (event: SelectChangeEvent<string | null>) => {
		const { name, value } = event.target
		// Handel driver field separately
		if (name === 'occupantsDriver') {
			setFormData((prevState) => ({
				...prevState,
				occupantsDriver: value as string,
			}))
		}
		// Handel owner field separately
		else if (name === 'registrationOwner') {
			setFormData((prevState) => ({
				...prevState,
				registrationOwner: value as string,
			}))
		}
		// For other fields, update the form data as usual
		else {
			setFormData((prevState) => ({
				...prevState,
				[name as string]: value || '',
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

	// Render entity menu items
	const renderEntityMenuItems = (
		entities: EntityListItem[],
		eventId: string | undefined,
		entityType: 'Person' | 'Organization' | 'All',
	): JSX.Element[] => {
		return entities
			.filter((entity) => {
				if (entityType === 'All') {
					return entity.parent?._id === eventId
				} else if (entityType === 'Person') {
					return entity.type === 'Person' && entity.parent?._id === eventId
				} else if (entityType === 'Organization') {
					return entity.type === 'Organization' && entity.parent?._id === eventId
				} else {
					return false
				}
			})
			.map((entity) => {
				if (!entity._id) return null
				if (entity.type === 'Organization') {
					return (
						<MenuItem key={entity._id} value={entity._id}>
							{entity.organization.legal.legalName || ''} ({entity.organization.contactName || ''})
						</MenuItem>
					)
				} else if (entity.type === 'Person') {
					return (
						<MenuItem key={entity._id} value={entity._id}>
							{entity.person.name.first || ''} {entity.person.name.last || ''}
						</MenuItem>
					)
				} else {
					return null
				}
			})
			.filter(Boolean) as JSX.Element[]
	}

	// Function to render the selected values in the passengers Select component
	const renderSelectedValues = (selected: string[]) => {
		return (
			<div>
				{selected.map((value) => {
					const selectedPerson = entities.find((entity) => entity._id === value)
					return (
						<Chip
							key={value}
							label={`${selectedPerson?.person.name.first} ${selectedPerson?.person.name.last}`}
							sx={{ marginRight: 1 }}
						/>
					)
				})}
			</div>
		)
	}

	// Function to render the menu items for the passengers Select component
	const renderMenuItems = (entities: EntityListItem[], eventId: string | undefined) => {
		return (
			eventId &&
			entities
				.filter((entity) => entity.parent?._id === eventId && entity.type === 'Person' && entity._id !== null)
				.map(
					(entity) =>
						entity._id && (
							<MenuItem key={entity._id} value={entity._id}>
								<Checkbox checked={formData.occupantsPassengers.indexOf(entity._id) > -1} />
								<ListItemText primary={`${entity.person.name.first || ''} ${entity.person.name.last || ''}`} />
							</MenuItem>
						),
				)
		)
	}

	// Get value providers
	useEffect(() => {
		setVehicleMakes(getVehicleMakes(t))
		setVehicleModels(getVehicleModels(t))
		setVehicleColors(getVehicleColors(t))
		setStates(getStates(t))
	}, [t])

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				{loading && <CircularProgress />}
				{typeof error === 'object' && Object.keys(error).length !== 0 && (
					<Typography color='error' variant='h6'>
						{t('common.statusIndicator.error')}: {error.toString()}
					</Typography>
				)}
				<form onSubmit={onSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.vehicles.titles.description')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='year'
								label={t('pages.vehicles.fields.year')}
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
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='make-label' required>
									{t('pages.vehicles.fields.make')}
								</InputLabel>
								<Select
									required
									labelId='make-label'
									id='make'
									name='make'
									value={formData.make}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>{t('pages.vehicles.placeholders.make')}</MenuItem>
									{vehicleMakes.map((option, index) => (
										<MenuItem key={index} value={option.key}>
											{option.value}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='model-label' required>
									{t('pages.vehicles.fields.model')}
								</InputLabel>
								<Select
									required
									labelId='model-label'
									id='model'
									name='model'
									value={formData.model}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>{t('pages.vehicles.placeholders.model')}</MenuItem>
									{formData.make &&
										vehicleModels[formData.make].map((option, index) => (
											<MenuItem key={index} value={option}>
												{option}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='color-label' required>
									{t('pages.vehicles.fields.color')}
								</InputLabel>
								<Select
									required
									labelId='color-label'
									id='color'
									name='color'
									value={formData.color}
									onChange={handleFormConditionalSelectChange}>
									<MenuItem value=''>{t('pages.vehicles.placeholders.color')}</MenuItem>
									{vehicleColors.map((option, index) => (
										<MenuItem key={index} value={option.key}>
											{option.value}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='vin'
								label={t('pages.vehicles.fields.vin')}
								variant='outlined'
								fullWidth
								value={formData.vin}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.vehicles.titles.occupants')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='driver-label' required>
									{t('pages.vehicles.fields.occupants.driver')}
								</InputLabel>
								{eventId && (
									<Select
										required
										labelId='driver-label'
										id='driver'
										name='occupantsDriver'
										value={formData.occupantsDriver}
										onChange={handleFormEntitySelectChange}>
										<MenuItem value=''>{t('pages.vehicles.placeholders.driver')}</MenuItem>
										{renderEntityMenuItems(entities, eventId, 'Person')}
									</Select>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='passengers-label'>{t('pages.vehicles.fields.occupants.passengers')}</InputLabel>
								{eventId && (
									<Select
										labelId='passengers-label'
										id='passengers'
										name='occupantsPassengers'
										value={formData.occupantsPassengers}
										onChange={handleFormMultiSelectChange}
										input={<OutlinedInput label='Tag' />}
										multiple
										renderValue={(selected) => renderSelectedValues(selected)}>
										{renderMenuItems(entities, eventId)}
									</Select>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.vehicles.titles.registration')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={4}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='owner-label' required>
									{t('pages.vehicles.fields.registration.owner')}
								</InputLabel>
								<Select
									required
									labelId='owner-label'
									id='owner'
									name='registrationOwner'
									value={formData.registrationOwner}
									onChange={handleFormEntitySelectChange}>
									<MenuItem value=''>{t('pages.vehicles.placeholders.owner')}</MenuItem>
									{renderEntityMenuItems(entities, eventId, 'All')}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='registrationPlateNumber'
								label={t('pages.vehicles.fields.registration.plateNumber')}
								variant='outlined'
								fullWidth
								value={formData.registrationPlateNumber}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={4}>
							<DatePicker
								name='registrationExpirationDate'
								label={t('pages.vehicles.fields.registration.expirationDate')}
								defaultValue={dayjs()}
								value={dayjs(formData.registrationExpirationDate)}
								onChange={(date) => handleFormDateChange(date, 'registrationExpirationDate')}
								slotProps={{
									textField: {
										required: false,
										fullWidth: true,
									},
								}}
							/>
						</Grid>
						<Grid item xs={4}>
							<TextField
								required
								name='registrationState'
								label={t('pages.vehicles.fields.registration.state')}
								variant='outlined'
								fullWidth
								select
								value={formData.registrationState}
								onChange={handleFormSelectChange}>
								{states.map((option, index) => (
									<MenuItem key={index} value={option.key}>
										{option.value}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.vehicles.titles.insurance')}
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
								label={t('pages.vehicles.fields.insurance.insured')}
							/>
						</Grid>
						{formData.insuranceInsured && (
							<>
								<Grid item xs={4}>
									<TextField
										name='insurancePolicyNumber'
										label={t('pages.vehicles.fields.insurance.policyNumber')}
										variant='outlined'
										fullWidth
										required
										value={formData.insurancePolicyNumber}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<TextField
										name='insuranceProvider'
										label={t('pages.vehicles.fields.insurance.provider')}
										variant='outlined'
										fullWidth
										required
										value={formData.insuranceProvider}
										onChange={handleFormChange}
									/>
								</Grid>
								<Grid item xs={4}>
									<DatePicker
										name='insuranceExpirationDate'
										label={t('pages.vehicles.fields.insurance.expirationDate')}
										defaultValue={dayjs()}
										value={dayjs(formData.insuranceExpirationDate)}
										onChange={(date) => handleFormDateChange(date, 'insuranceExpirationDate')}
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
								{t('pages.vehicles.titles.legality')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<FormControlLabel
								control={<Switch name='stolen' checked={formData.stolen} onChange={handleFormSwitchChange('stolen')} />}
								label={t('pages.vehicles.fields.stolen')}
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
								label={t('pages.vehicles.fields.illegalModifications.wasModified')}
							/>
						</Grid>
						{formData.illegalModificationsWasModified && (
							<Grid item xs={12}>
								<TextField
									name='illegalModificationsDescription'
									label={t('pages.vehicles.fields.illegalModifications.description')}
									variant='outlined'
									fullWidth
									required
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
								{t('common.buttons.cancel')}
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{vehicle?._id ? t('pages.vehicles.buttons.edit') : t('pages.vehicles.buttons.new')}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default VehicleInputForm
