import React, { FC, useContext, useState, useEffect, FormEvent } from 'react'
import { EntityFormData } from '../../../types/entities/EntityFormTypes'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { readEntity, updateEntity, createEntity } from '../../store/actions/mongodb/entityActions'
import { Grid, Typography } from '@mui/material'
import { Entity } from '../../store/types/EntityTypes'

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
		personIdentificationTaxIdNumber: entityValues?.personIdentificationTaxIdNumber || '',
		personIdentificationVisaType: entityValues?.personIdentificationVisaType || '',
		personIdentificationVisaExpiryDate: entityValues?.personIdentificationVisaExpiryDate || new Date(),
		personIdentificationIsLegalResident: entityValues?.personIdentificationIsLegalResident || false,
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
		contactName: entityValues?.contactName || '',
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
			header: entityValues ? 'Update Entity' : 'Add Entity',
			subheader: entityValues ? 'Update an existing Entity' : 'Add a new entity',
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
				personIdentificationDriverLicenseNumber: entity.person.identification.driverLicenseNumber ?? '',
				personIdentificationNationalIdNumber: entity.person.identification.nationalIdNumber ?? '',
				personIdentificationTaxIdNumber: entity.person.identification.taxIdNumber ?? '',
				personIdentificationVisaType: entity.person.identification.visaType ?? '',
				personIdentificationVisaExpiryDate: entity.person.identification.visaExpiryDate
					? new Date(entity.person.identification.visaExpiryDate)
					: new Date(),
				personIdentificationIsLegalResident: entity.person.identification.isLegalResident ?? false,
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
				contactName: entity.contact.name ?? '',
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
						driverLicenseNumber: formData.personIdentificationDriverLicenseNumber || null,
						nationalIdNumber: formData.personIdentificationNationalIdNumber || null,
						taxIdNumber: formData.personIdentificationTaxIdNumber || null,
						visaType: formData.personIdentificationVisaType || null,
						visaExpiryDate: formData.personIdentificationVisaExpiryDate || null,
						isLegalResident: formData.personIdentificationIsLegalResident || false,
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
					name: formData.contactName || null,
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
				console.error('Parent ID is required or entity data will be an orphaned record')
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
			console.error('Error: ', error)
		}
	}

	return <>Entity Input Form</>
}

export default EntityInputForm
