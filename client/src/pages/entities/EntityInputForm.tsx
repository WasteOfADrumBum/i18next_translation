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
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from 'store'
import { EntityFormData } from '../../../types/entities/EntityFormTypes'
import { HeaderContext } from '../../contexts'
import { createEntity, readEntity, updateEntity } from '../../store/actions/mongodb/entityActions'
import { Entity } from '../../store/types/EntityTypes'
import {
	businessLegalEntityTypes,
	businessLegalStatus,
	countries,
	employmentStatus,
	entityTypes,
	nativeLanguages,
	states,
} from '../../utils'

interface EntityInputFormProps {
	entityValues?: EntityFormData
}

const EntityInputForm: FC<EntityInputFormProps> = ({ entityValues }) => {
	const { t } = useTranslation()
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
			header: entityValues ? t('pages.entities.header.title.edit') : t('pages.entities.header.title.new'),
			subheader: entityValues ? t('pages.entities.header.subtitle.edit') : t('pages.entities.header.subtitle.new'),
			extraContent: (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Typography variant='caption'>{t('common.forms.requiredDisclaimer')}</Typography>
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
	}, [setHeaderData, eventId, entityValues, t])

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
				console.error(t('errors:parentIdRequired'))
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
			console.error(`${t('errors:genericError')}: `, error)
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
						{t('common.statusIndicator.error')}: {error.toString()}
					</Typography>
				)}
				<form onSubmit={onSubmit}>
					<Grid container spacing={2}>
						{/* Entity Type */}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.entities.fields.type')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={3}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='make-label'>{t('pages.entities.fields.type')}</InputLabel>
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
												label={t('pages.entities.fields.organization.legal.legalName')}
												variant='outlined'
												fullWidth
												value={formData.organizationLegalLegalName}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='organizationLegalLegalEntityType-label'>
													{t('pages.entities.fields.organization.legal.legalEntityType')}
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
													{t('pages.entities.fields.organization.legal.legalStatus')}
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
												label={t('pages.entities.fields.organization.legal.incorporationDate')}
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
												label={t('pages.entities.fields.organization.legal.businessRegistrationNumber')}
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
												label={t('pages.entities.fields.person.name.first')}
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
												label={t('pages.entities.fields.person.name.middle')}
												variant='outlined'
												fullWidth
												value={formData.personNameMiddle}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<TextField
												name='personNameLast'
												label={t('pages.entities.fields.person.name.last')}
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
												label={t('pages.entities.fields.person.name.suffix')}
												variant='outlined'
												fullWidth
												value={formData.personNameSuffix}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personDob'
												label={t('pages.entities.fields.person.dob')}
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
												label={t('pages.entities.fields.person.age')}
												variant='outlined'
												fullWidth
												disabled
												value={formData.personAge}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personNativeLanguage-label'>
													{t('pages.entities.fields.person.nativeLanguage')}
												</InputLabel>
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
												{t('pages.entities.titles.identification')}
											</Typography>
											<Divider />
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationSsn'
												label={t('pages.entities.fields.person.identification.ssn')}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationSsn}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationNationalIdNumber'
												label={t('pages.entities.fields.person.identification.nationalIdNumber')}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationNationalIdNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personIdentificationPassportNumber'
												label={t('pages.entities.fields.person.identification.passportNumber')}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationPassportNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personIdentificationPassportCountry-label'>
													{t('pages.entities.fields.person.identification.passportCountry')}
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
												label={t('pages.entities.fields.person.identification.driverLicenseNumber')}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationDriverLicenseNumber}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<FormControl fullWidth variant='outlined'>
												<InputLabel id='personIdentificationDriverLicenseState-label'>
													{t('pages.entities.fields.person.identification.driverLicenseState')}
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
												label={t('pages.entities.fields.person.identification.visaType')}
												variant='outlined'
												fullWidth
												value={formData.personIdentificationVisaType}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personIdentificationVisaExpiryDate'
												label={t('pages.entities.fields.person.identification.visaExpiryDate')}
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
												label={t('pages.entities.fields.person.identification.isIllegalResident')}
											/>
										</Grid>
										{formData.personIdentificationIsIllegalResident && (
											<Grid item xs={12}>
												<TextField
													name='personIdentificationIllegalStatusDescription'
													label={t('pages.entities.fields.person.identification.illegalStatusDescription')}
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
												{t('pages.entities.titles.employment')}
											</Typography>
											<Divider />
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentJobTitle'
												label={t('pages.entities.fields.person.employment.jobTitle')}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentJobTitle}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentDepartment'
												label={t('pages.entities.fields.person.employment.department')}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentDepartment}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name='personEmploymentEmployeeId'
												label={t('pages.entities.fields.person.employment.employeeId')}
												variant='outlined'
												fullWidth
												value={formData.personEmploymentEmployeeId}
												onChange={handleFormChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<DatePicker
												name='personEmploymentHireDate'
												label={t('pages.entities.fields.person.employment.hireDate')}
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
													{t('pages.entities.fields.person.employment.employmentStatus')}
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
								{t('pages.entities.titles.contact')}
							</Typography>
							<Divider />
						</Grid>
						{formData.type === 'Organization' && (
							<Grid item xs={12}>
								<TextField
									name='organizationContactName'
									label={t('pages.entities.fields.organization.contactName')}
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
								label={t('pages.entities.fields.contact.phone')}
								variant='outlined'
								fullWidth
								value={formData.contactPhone}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='contactEmail'
								label={t('pages.entities.fields.contact.email')}
								variant='outlined'
								fullWidth
								value={formData.contactEmail}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='contactSocialMedia'
								label={t('pages.entities.fields.contact.socialMedia')}
								variant='outlined'
								fullWidth
								value={formData.contactSocialMedia}
								onChange={handleFormChange}
							/>
						</Grid>
						{/* Address */}
						<Grid item xs={12}>
							<Typography variant='h4' color={'primary'} mb={1}>
								{t('pages.entities.titles.location')}
							</Typography>
							<Divider />
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressAddress'
								label={t('pages.entities.fields.address.address')}
								variant='outlined'
								fullWidth
								value={formData.addressAddress}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressCity'
								label={t('pages.entities.fields.address.city')}
								variant='outlined'
								fullWidth
								value={formData.addressCity}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='addressState-label'>{t('pages.entities.fields.address.state')}</InputLabel>
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
								label={t('pages.entities.fields.address.zip')}
								variant='outlined'
								fullWidth
								placeholder='Enter ZIP'
								value={formData.addressZip || ''}
								onChange={handleFormChange}
								helperText={
									!formData.addressZip || isNaN(formData.addressZip as number)
										? t('pages.entities.fields.address.zipNan')
										: ''
								}
								inputProps={{
									maxLength: 5, // Set maximum character limit for 5-digit Zip codes
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								name='addressCounty'
								label={t('pages.entities.fields.address.county')}
								variant='outlined'
								fullWidth
								value={formData.addressCounty}
								onChange={handleFormChange}
							/>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='addressCountry-label'>{t('pages.entities.fields.address.country')}</InputLabel>
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
								{t('common.buttons.cancel')}
							</Button>
							<Button type='submit' variant='contained' color='primary' sx={{ textAlign: 'right' }}>
								<AddCircleOutline sx={{ marginRight: 1 }} />
								{entity?._id ? t('pages.entities.buttons.edit') : t('pages.entities.buttons.new')}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	)
}

export default EntityInputForm
