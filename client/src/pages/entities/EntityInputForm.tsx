import { AddCircleOutline, CancelOutlined } from '@mui/icons-material'
import {
	Button,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import React, { ChangeEvent, FC, FormEvent, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { EntityFormData } from '../../../types/entities/EntityFormTypes'
import { HeaderContext } from '../../contexts/HeaderContext'
import translations from '../../i18n/locales'
import { createEntity, readEntity, updateEntity } from '../../store/actions/mongodb/entityActions'
import { Entity } from '../../store/types/EntityTypes'
import {
	businessLegalEntityTypes,
	businessLegalStatus,
	countries,
	employmentStatus,
	entityTypes,
	GetLanguage,
	nativeLanguages,
	states,
} from '../../utils'

const entityHeaderT = translations.pages.entities[GetLanguage()].header
const entityFieldT = translations.pages.entities[GetLanguage()].fields
const entityTitlesT = translations.pages.entities[GetLanguage()].titles
const entityButtonT = translations.pages.entities[GetLanguage()].buttons
const statusIndicatorT = translations.common[GetLanguage()].statusIndicator
const commonButton = translations.common[GetLanguage()].buttons

interface EntityInputFormProps {
	entityValues?: EntityFormData
}

const EntityInputForm: FC<EntityInputFormProps> = ({ entityValues }) => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId, entityId } = useParams<{ eventId: string; entityId: string }>()
	// ----------------------------- States ----------------------------- //
	const [formData, setFormData] = useState<EntityFormData>({
		_id: entityValues?._id,
		parentId: eventId || entityValues?.parentId || '',
		parentName: entityValues?.parentName || '',
		type: entityValues?.type || '',
		personNameFirst: entityValues?.personNameFirst || '',
		personNameMiddle: entityValues?.personNameMiddle || '',
		personNameLast: entityValues?.personNameLast || '',
		personNameSuffix: entityValues?.personNameSuffix || '',
		personDob: entityValues?.personDob || new Date(),
		personAge: entityValues?.personAge || '',
		personNativeLanguage: entityValues?.personNativeLanguage || '',
		personIdentificationSsn: entityValues?.personIdentificationSsn || '',
		personIdentificationPassportNumber: entityValues?.personIdentificationPassportNumber || '',
		personIdentificationDriverLicenseNumber: entityValues?.personIdentificationDriverLicenseNumber || '',
		personIdentificationNationalIdNumber: entityValues?.personIdentificationNationalIdNumber || '',
		personIdentificationVisaType: entityValues?.personIdentificationVisaType || '',
		personIdentificationVisaExpiryDate: entityValues?.personIdentificationVisaExpiryDate || new Date(),
		personIdentificationIsIllegalResident: entityValues?.personIdentificationIsIllegalResident || false,
		personIdentificationIllegalStatusDescription: entityValues?.personIdentificationIllegalStatusDescription || '',
		personEmploymentJobTitle: entityValues?.personEmploymentJobTitle || '',
		personEmploymentDepartment: entityValues?.personEmploymentDepartment || '',
		personEmploymentEmployeeId: entityValues?.personEmploymentEmployeeId || '',
		personEmploymentHireDate: entityValues?.personEmploymentHireDate || new Date(),
		personEmploymentEmploymentStatus: entityValues?.personEmploymentEmploymentStatus || '',
		organizationContactName: entityValues?.organizationContactName || '',
		organizationLegalLegalName: entityValues?.organizationLegalLegalName || '',
		organizationLegalLegalEntityType: entityValues?.organizationLegalLegalEntityType || '',
		organizationLegalLegalStatus: entityValues?.organizationLegalLegalStatus || '',
		organizationLegalIncorporationDate: entityValues?.organizationLegalIncorporationDate || new Date(),
		organizationLegalBusinessRegistrationNumber: entityValues?.organizationLegalBusinessRegistrationNumber || '',
		contactPhone: entityValues?.contactPhone || '',
		contactEmail: entityValues?.contactEmail || '',
		contactSocialMedia: entityValues?.contactSocialMedia || '',
		addressAddress: entityValues?.addressAddress || '',
		addressCity: entityValues?.addressCity || '',
		addressState: entityValues?.addressState || '',
		addressZip: entityValues?.addressZip || 0,
		addressCounty: entityValues?.addressCounty || '',
		addressCountry: entityValues?.addressCountry || '',
	})

	// Fetch entity date from Redux store
	useEffect(() => {
		if (entityId) {
			dispatch(readEntity(entityId))
		}
	}, [dispatch, entityId])

	// Update form data when entity data is fetched from Redux store
	const { loading, error, entity } = useSelector((state: RootState) => state.entities)

	// Update header data when conomponent mounts
	useEffect(() => {
		setHeaderData({
			header: entityValues ? entityHeaderT.title.edit : entityHeaderT.title.new,
			subheader: entityValues ? entityHeaderT.subtitle.edit : entityHeaderT.subtitle.new,
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>{translations.common[GetLanguage()].forms.requiredDisclaimer}</Typography>
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

	// Update form data when entity data is fetched from Redux store
	useEffect(() => {
		if (entityId && entity) {
			setFormData({
				_id: entity._id!,
				parentId: entity.parent._id ?? '',
				parentName: entity.parent.name ?? '',
				type: entity.type ?? '',
				personNameFirst: entity.person.name.first ?? '',
				personNameMiddle: entity.person.name.middle ?? '',
				personNameLast: entity.person.name.last ?? '',
				personNameSuffix: entity.person.name.suffix ?? '',
				personDob: entity.person.dob ? new Date(entity.person.dob) : new Date(),
				personAge: entity.person.age ?? '',
				personNativeLanguage: entity.person.nativeLanguage ?? '',
				personIdentificationSsn: entity.person.identification.ssn ?? '',
				personIdentificationPassportNumber: entity.person.identification.passportNumber ?? '',
				personIdentificationPassportCountry: entity.person.identification.passportCountry ?? '',
				personIdentificationDriverLicenseNumber: entity.person.identification.driverLicenseNumber ?? '',
				personIdentificationDriverLicenseState: entity.person.identification.driverLicenseState ?? '',
				personIdentificationNationalIdNumber: entity.person.identification.nationalIdNumber ?? '',
				personIdentificationVisaType: entity.person.identification.visaType ?? '',
				personIdentificationVisaExpiryDate: entity.person.identification.visaExpiryDate
					? new Date(entity.person.identification.visaExpiryDate)
					: new Date(),
				personIdentificationIsIllegalResident: entity.person.identification.isIllegalResident ?? false,
				personIdentificationIllegalStatusDescription: entity.person.identification.illegalStatusDescription ?? '',
				personEmploymentJobTitle: entity.person.employment.jobTitle ?? '',
				personEmploymentDepartment: entity.person.employment.department ?? '',
				personEmploymentEmployeeId: entity.person.employment.employeeId ?? '',
				personEmploymentHireDate: entity.person.employment.hireDate
					? new Date(entity.person.employment.hireDate)
					: new Date(),
				personEmploymentEmploymentStatus: entity.person.employment.employmentStatus ?? '',
				organizationContactName: entity.organization.contactName ?? '',
				organizationLegalLegalName: entity.organization.legal.legalName ?? '',
				organizationLegalLegalEntityType: entity.organization.legal.legalEntityType ?? '',
				organizationLegalLegalStatus: entity.organization.legal.legalStatus ?? '',
				organizationLegalIncorporationDate: entity.organization.legal.incorporationDate
					? new Date(entity.organization.legal.incorporationDate)
					: new Date(),
				organizationLegalBusinessRegistrationNumber: entity.organization.legal.businessRegistrationNumber ?? '',
				contactPhone: entity.contact.phone ?? '',
				contactEmail: entity.contact.email ?? '',
				contactSocialMedia: entity.contact.socialMedia ?? '',
				addressAddress: entity.address.address ?? '',
				addressCity: entity.address.city ?? '',
				addressState: entity.address.state ?? '',
				addressZip: entity.address.zip ?? 0,
				addressCounty: entity.address.county ?? '',
				addressCountry: entity.address.country ?? '',
			})
		}
	}, [entity, entityId])

	// Handle form submission
	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		try {
			const entityData: Entity = {
				_id: formData._id ? formData._id.toString() : null,
				parent: {
					_id: formData.parentId,
					name: 'eventDB',
				},
				type: formData.type,
				person: {
					name: {
						first: formData.personNameFirst || null,
						middle: formData.personNameMiddle || null,
						last: formData.personNameLast || null,
						suffix: formData.personNameSuffix || null,
					},
					dob: formData.personDob || null,
					age: formData.personAge || null,
					nativeLanguage: formData.personNativeLanguage || null,
					identification: {
						ssn: formData.personIdentificationSsn || null,
						passportNumber: formData.personIdentificationPassportNumber || null,
						passportCountry: formData.personIdentificationPassportCountry || null,
						driverLicenseNumber: formData.personIdentificationDriverLicenseNumber || null,
						driverLicenseState: formData.personIdentificationDriverLicenseState || null,
						nationalIdNumber: formData.personIdentificationNationalIdNumber || null,
						visaType: formData.personIdentificationVisaType || null,
						visaExpiryDate: formData.personIdentificationVisaExpiryDate || null,
						isIllegalResident: formData.personIdentificationIsIllegalResident || false,
						illegalStatusDescription: formData.personIdentificationIllegalStatusDescription || null,
					},
					employment: {
						jobTitle: formData.personEmploymentJobTitle || null,
						department: formData.personEmploymentDepartment || null,
						employeeId: formData.personEmploymentEmployeeId || null,
						hireDate: formData.personEmploymentHireDate || null,
						employmentStatus: formData.personEmploymentEmploymentStatus || null,
					},
				},
				organization: {
					contactName: formData.organizationContactName,
					legal: {
						legalName: formData.organizationLegalLegalName,
						legalEntityType: formData.organizationLegalLegalEntityType || null,
						legalStatus: formData.organizationLegalLegalStatus || null,
						incorporationDate: formData.organizationLegalIncorporationDate || new Date(),
						businessRegistrationNumber: formData.organizationLegalBusinessRegistrationNumber || null,
					},
				},
				contact: {
					phone: formData.contactPhone || null,
					email: formData.contactEmail || null,
					socialMedia: formData.contactSocialMedia || null,
				},
				address: {
					address: formData.addressAddress || null,
					city: formData.addressCity || null,
					state: formData.addressState || null,
					zip: formData.addressZip || null,
					county: formData.addressCounty || null,
					country: formData.addressCountry || null,
				},
			}

			// Check if parent ID is provided
			if (entityData.parent._id === null || entityData.parent._id === '') {
				console.error(translations.errors[GetLanguage()].parentIdRequired)
			} else if (entityData._id !== null) {
				dispatch(updateEntity(entityData))
				console.log('Updating entity: ', entityData)
				navigate(`/dashboard/event/${eventId}/entity`)
			} else {
				dispatch(createEntity(entityData))
				console.log('Creating entity: ', entityData)
				navigate(`/dashboard/event/${eventId}/entity`)
			}
		} catch (error) {
			console.error(`${translations.errors[GetLanguage()].genericError}: `, error)
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

	// Handle form select changes
	const handleFormSelectChange = (event: SelectChangeEvent<string>) => {
		const { name, value } = event.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
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

	// Handel toggle switch changes
	const handleFormSwitchChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target

		if (name === 'personIdentificationIsIllegalResident' && !checked) {
			setFormData((prevState) => ({
				...prevState,
				personIdentificationIllegalStatusDescription: '',
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

	// Calculate age from date of birth
	useEffect(() => {
		const dob = dayjs(formData.personDob)
		const age = dayjs().diff(dob, 'year')
		setFormData((prevState) => ({
			...prevState,
			personAge: age.toString(),
		}))
	}, [formData.personDob])

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				{loading && <CircularProgress />}
				{typeof error === 'object' && Object.keys(error).length !== 0 && (
					<Typography color='error' variant='h6'>
						{statusIndicatorT.error}: {error.toString()}
					</Typography>
				)}
				<form onSubmit={onSubmit}>
					<Grid container spacing={2}>
						{/* Entity Type */}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{entityFieldT.type}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='make-label'>{entityFieldT.type}</InputLabel>
								<Select
									required
									labelId='make-label'
									id='type'
									name='type'
									value={formData.type}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select a Entity Type</MenuItem>
									{entityTypes.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						{/* Entity Information */}
						{(formData.type === 'Person' || formData.type === 'Organization') && (
							<>
								<Grid item xs={12}>
									<Typography variant='h4' color={'primary'} mb={1}>
										Entity Information
									</Typography>
									<Divider />
								</Grid>
								{formData.type === 'Organization' && (
									<>
										<Grid item xs={12}>
											<TextField
												name='organizationLegalLegalName'
												label={entityFieldT.organization.legal.legalName}
												variant='outlined'
												fullWidth
												value={formData.organizationLegalLegalName}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='organizationLegalLegalEntityType-label'>
													{entityFieldT.organization.legal.legalEntityType}
												</InputLabel>
												<Select
													labelId='organizationLegalLegalEntityType-label'
													id='type'
													name='organizationLegalLegalEntityType'
													value={formData.organizationLegalLegalEntityType || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select a Legal Entity Type</MenuItem>
													{businessLegalEntityTypes.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='organizationLegalLegalStatus-label'>
													{entityFieldT.organization.legal.legalStatus}
												</InputLabel>
												<Select
													labelId='organizationLegalLegalStatus-label'
													id='type'
													name='organizationLegalLegalStatus'
													value={formData.organizationLegalLegalStatus || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select a Legal Status</MenuItem>
													{businessLegalStatus.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='organizationLegalIncorporationDate'
												label={entityFieldT.organization.legal.incorporationDate}
												defaultValue={dayjs()}
												value={dayjs(formData.organizationLegalIncorporationDate)}
												onChange={(date) => handleFormDateChange(date, 'organizationLegalIncorporationDate')}
												disableFuture
												slotProps={{
													textField: {
														required: false,
														fullWidth: true,
													},
												}}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='organizationLegalBusinessRegistrationNumber'
												label={entityFieldT.organization.legal.businessRegistrationNumber}
												variant='outlined'
												fullWidth
												value={formData.organizationLegalBusinessRegistrationNumber}
												onChange={handleFormChange}
											/>
										</Grid>
									</>
								)}
								{formData.type === 'Person' && (
									<>
										<Grid item xs={3}>
											<TextField
												name='personNameFirst'
												label={entityFieldT.person.name.first}
												variant='outlined'
												fullWidth
												required
												value={formData.personNameFirst}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												name='personNameMiddle'
												label={entityFieldT.person.name.middle}
												variant='outlined'
												fullWidth
												value={formData.personNameMiddle}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												name='personNameLast'
												label={entityFieldT.person.name.last}
												variant='outlined'
												fullWidth
												required
												value={formData.personNameLast}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												name='personNameSuffix'
												label={entityFieldT.person.name.suffix}
												variant='outlined'
												fullWidth
												value={formData.personNameSuffix}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personDob'
												label={entityFieldT.person.dob}
												defaultValue={dayjs()}
												value={dayjs(formData.personDob)}
												onChange={(date) => handleFormDateChange(date, 'personDob')}
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
												name='personAge'
												label={entityFieldT.person.age}
												variant='outlined'
												fullWidth
												disabled
												value={formData.personAge}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personNativeLanguage-label'>{entityFieldT.person.nativeLanguage}</InputLabel>
												<Select
													required
													labelId='personNativeLanguage-label'
													id='type'
													name='personNativeLanguage'
													value={formData.personNativeLanguage || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select a Native Language</MenuItem>
													{nativeLanguages.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										{/* Identification */}
										<Grid item xs={12}>
											<Typography variant='h4' color={'primary'} mb={1}>
												{entityTitlesT.identification}
											</Typography>
											<Divider />
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationSsn'
												label={entityFieldT.person.identification.ssn}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationSsn}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationNationalIdNumber'
												label={entityFieldT.person.identification.nationalIdNumber}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationNationalIdNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationPassportNumber'
												label={entityFieldT.person.identification.passportNumber}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationPassportNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personIdentificationPassportCountry-label'>
													{entityFieldT.person.identification.passportCountry}
												</InputLabel>
												<Select
													labelId='personIdentificationPassportCountry-label'
													id='type'
													name='personIdentificationPassportCountry'
													value={formData.personIdentificationPassportCountry || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select a Passport Country</MenuItem>
													{countries.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationDriverLicenseNumber'
												label={entityFieldT.person.identification.driverLicenseNumber}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationDriverLicenseNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personIdentificationDriverLicenseState-label'>
													{entityFieldT.person.identification.driverLicenseState}
												</InputLabel>
												<Select
													labelId='personIdentificationDriverLicenseState-label'
													id='type'
													name='personIdentificationDriverLicenseState'
													value={formData.personIdentificationDriverLicenseState || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select a Driver License State</MenuItem>
													{states.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationVisaType'
												label={entityFieldT.person.identification.visaType}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationVisaType}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personIdentificationVisaExpiryDate'
												label={entityFieldT.person.identification.visaExpiryDate}
												defaultValue={dayjs()}
												value={dayjs(formData.personIdentificationVisaExpiryDate)}
												onChange={(date) => handleFormDateChange(date, 'personIdentificationVisaExpiryDate')}
												slotProps={{
													textField: {
														required: false,
														fullWidth: true,
													},
												}}
											/>
										</Grid>
										<Grid item xs={12}>
											<FormControlLabel
												control={
													<Switch
														name='personIdentificationIsIllegalResident'
														checked={formData.personIdentificationIsIllegalResident || false}
														onChange={handleFormSwitchChange('personIdentificationIsIllegalResident')}
													/>
												}
												label={entityFieldT.person.identification.isIllegalResident}
											/>
										</Grid>
										{formData.personIdentificationIsIllegalResident && (
											<Grid item xs={12}>
												<TextField
													name='personIdentificationIllegalStatusDescription'
													label={entityFieldT.person.identification.illegalStatusDescription}
													variant='outlined'
													fullWidth
													value={formData.personIdentificationIllegalStatusDescription}
													onChange={handleFormChange}
												/>
											</Grid>
										)}
										{/* Employment */}
										<Grid item xs={12}>
											<Typography variant='h4' color={'primary'} mb={1}>
												{entityTitlesT.employment}
											</Typography>
											<Divider />
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentJobTitle'
												label={entityFieldT.person.employment.jobTitle}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentJobTitle}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentDepartment'
												label={entityFieldT.person.employment.department}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentDepartment}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentEmployeeId'
												label={entityFieldT.person.employment.employeeId}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentEmployeeId}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personEmploymentHireDate'
												label={entityFieldT.person.employment.hireDate}
												defaultValue={dayjs()}
												value={dayjs(formData.personEmploymentHireDate)}
												onChange={(date) => handleFormDateChange(date, 'personEmploymentHireDate')}
												disableFuture
												slotProps={{
													textField: {
														required: false,
														fullWidth: true,
													},
												}}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personEmploymentEmploymentStatus-label'>
													{entityFieldT.person.employment.employmentStatus}
												</InputLabel>
												<Select
													labelId='personEmploymentEmploymentStatus-label'
													id='type'
													name='personEmploymentEmploymentStatus'
													value={formData.personEmploymentEmploymentStatus || ''}
													onChange={handleFormSelectChange}>
													<MenuItem value=''>Select an Employment Status</MenuItem>
													{employmentStatus.map((option, index) => (
														<MenuItem key={index} value={option}>
															{option}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
									</>
								)}
							</>
						)}
						{/* Contact Information */}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{entityTitlesT.contact}
							</Typography>
							<Divider />
						</Grid>
						{formData.type === 'Organization' && (
							<Grid item xs={12}>
								<TextField
									name='organizationContactName'
									label={entityFieldT.organization.contactName}
									variant='outlined'
									fullWidth
									value={formData.organizationContactName}
									onChange={handleFormChange}
								/>
							</Grid>
						)}
						<Grid item xs={6}>
							<TextField
								name='contactPhone'
								label={entityFieldT.contact.phone}
								variant='outlined'
								fullWidth
								value={formData.contactPhone}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='contactEmail'
								label={entityFieldT.contact.email}
								variant='outlined'
								fullWidth
								value={formData.contactEmail}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='contactSocialMedia'
								label={entityFieldT.contact.socialMedia}
								variant='outlined'
								fullWidth
								value={formData.contactSocialMedia}
								onChange={handleFormChange}
							/>
						</Grid>
						{/* Address */}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{entityTitlesT.location}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressAddress'
								label={entityFieldT.address.address}
								variant='outlined'
								fullWidth
								value={formData.addressAddress}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressCity'
								label={entityFieldT.address.city}
								variant='outlined'
								fullWidth
								value={formData.addressCity}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='addressState-label'>{entityFieldT.address.state}</InputLabel>
								<Select
									labelId='addressState-label'
									id='type'
									name='addressState'
									value={formData.addressState || ''}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select a State</MenuItem>
									{states.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressZip'
								label={entityFieldT.address.zip}
								variant='outlined'
								fullWidth
								placeholder='Enter ZIP'
								value={formData.addressZip || ''}
								onChange={handleFormChange}
								helperText={
									!formData.addressZip || isNaN(formData.addressZip as number) ? entityFieldT.address.zipNan : ''
								}
								inputProps={{
									maxLength: 5, // Set maximum character limit for 5-digit Zip codes
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressCounty'
								label={entityFieldT.address.county}
								variant='outlined'
								fullWidth
								value={formData.addressCounty}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='addressCountry-label'>{entityFieldT.address.country}</InputLabel>
								<Select
									labelId='addressCountry-label'
									id='type'
									name='addressCountry'
									value={formData.addressCountry || ''}
									onChange={handleFormSelectChange}>
									<MenuItem value=''>Select a Country</MenuItem>
									{countries.map((option, index) => (
										<MenuItem key={index} value={option}>
											{option}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item container xs={12} justifyContent='space-between'>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => navigate('/dashboard/event/${eventId}/entity')}>
								<CancelOutlined sx={{ marginRight: 1 }} />
								{commonButton.cancel}
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{entity?._id ? entityButtonT.edit : entityButtonT.new}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default EntityInputForm
