import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import translations from '../../i18n/locales'
import { AppDispatch, RootState } from '../../store'
import { readEntity } from '../../store/actions/mongodb/entityActions'
import { GetCountryAbbreviation, GetStateAbbreviation, TimeConversionsHelper } from '../../utils'

const entityHeaderT = translations.pages.entities.header
const entityFieldT = translations.pages.entities.fields
const entityTitlesT = translations.pages.entities.titles
const statusIndicatorT = translations.common.statusIndicator

const EntityDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()
	const { eventId, entityId } = useParams<{ eventId: string; entityId: string }>()

	// Fetch entity details from Redux store
	useEffect(() => {
		if (entityId) {
			// Check if entityId is not undefined
			dispatch(readEntity(entityId))
		}
	}, [dispatch, entityId])

	// Access entity details from Redux store
	const { entity, loading, error } = useSelector((state: RootState) => state.entities)

	// Update header data when component mounts
	useEffect(() => {
		setHeaderData({
			header: entityHeaderT.title.single,
			subheader: entityHeaderT.subtitle.single,
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{entityFieldT.id}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{entity?._id}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{entityFieldT.type}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{entity?.type}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: `dashboard/event/${eventId}/entity`,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: '',
				subheader: '',
				extraContent: null,
			})
		}
	}, [setHeaderData, entity, eventId])
	console.log(entity)

	return (
		<Container maxWidth='xl'>
			{/* Display event details */}
			{loading ? (
				<Typography variant='h6'>{statusIndicatorT.loading}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{statusIndicatorT.error}: {error.toString()}
				</Typography>
			) : (
				<Grid container spacing={2}>
					{/* Entity Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{entityTitlesT.identification}
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Person' && (
						<>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityTitlesT.name}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.name.first && `${entity?.person.name.first}`}
									{entity?.person.name.middle && ` ${entity?.person.name.middle}`}
									{entity?.person.name.last && ` ${entity?.person.name.last}`}
									{entity?.person.name.suffix && ` ${entity?.person.name.suffix}`}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.dob} ({entityFieldT.person.age})
								</Typography>
								<Typography variant='body2'>
									{entity?.person.dob
										? TimeConversionsHelper.convertTime(entity?.person.dob, 'MM/DD/YYYY', false, 'UTC')
										: entityFieldT.person.dob + ' ' + statusIndicatorT.notAvailable}
									{entity?.person.age || entityFieldT.person.age + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.nativeLanguage}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.nativeLanguage ||
										entityFieldT.person.nativeLanguage + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									{entityTitlesT.identification}
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.identification.ssn}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.ssn ||
										entityFieldT.person.identification.ssn + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityTitlesT.passport}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.passportCountry &&
										GetCountryAbbreviation(entity?.person.identification.passportCountry) + ' '}
									{entity?.person.identification.passportNumber ||
										entityFieldT.person.identification.passportNumber + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityTitlesT.driverLicense}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.driverLicenseState &&
										GetStateAbbreviation(entity?.person.identification.driverLicenseState) + ' '}
									{entity?.person.identification.driverLicenseNumber ||
										entityFieldT.person.identification.driverLicenseNumber + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.identification.nationalIdNumber}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.nationalIdNumber ||
										entityFieldT.person.identification.nationalIdNumber + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.identification.visaType}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.visaType ||
										entityFieldT.person.identification.visaType + ' ' + statusIndicatorT.notAvailable}
									{entity?.person.identification.visaType &&
										entity?.person.identification.visaExpiryDate &&
										` (${statusIndicatorT.expires}: ${TimeConversionsHelper.convertTime(entity?.person.identification.visaExpiryDate, 'MM/DD/YYYY', false, 'UTC')})`}
								</Typography>
							</Grid>
							{(entity?.person.identification.isIllegalResident && (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										{entityFieldT.person.identification.isIllegalResident}
									</Typography>
									<Typography variant='body2'>
										{entity?.person.identification.illegalStatusDescription ||
											entityFieldT.person.identification.illegalStatusDescription + ' ' + statusIndicatorT.notAvailable}
									</Typography>
								</Grid>
							)) || (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										{entityFieldT.person.identification.isIllegalResident}
									</Typography>
									<Typography variant='body2'>Yes</Typography>
								</Grid>
							)}
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									{entityTitlesT.employment}
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.employment.jobTitle}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.jobTitle ||
										entityFieldT.person.employment.jobTitle + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.employment.department}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.department ||
										entityFieldT.person.employment.department + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.employment.employeeId}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employeeId ||
										entityFieldT.person.employment.employeeId + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.employment.hireDate}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.hireDate
										? TimeConversionsHelper.convertTime(entity?.person.employment.hireDate, 'MM/DD/YYYY', false, 'UTC')
										: entityFieldT.person.employment.hireDate + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.person.employment.employmentStatus}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employmentStatus ||
										entityFieldT.person.employment.employmentStatus + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
						</>
					)}
					{entity?.type === 'Organization' && (
						<>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.organization.legal.legalName}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalName ||
										entityFieldT.organization.legal.legalName + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.organization.legal.legalEntityType}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalEntityType ||
										entityFieldT.organization.legal.legalEntityType + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.organization.legal.legalStatus}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalStatus ||
										entityFieldT.organization.legal.legalStatus + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.organization.legal.incorporationDate}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.incorporationDate
										? TimeConversionsHelper.convertTime(
												entity?.organization.legal.incorporationDate,
												'MM/DD/YYYY',
												false,
												'UTC',
											)
										: entityFieldT.organization.legal.incorporationDate + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{entityFieldT.organization.legal.businessRegistrationNumber}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.businessRegistrationNumber ||
										entityFieldT.organization.legal.businessRegistrationNumber + ' ' + statusIndicatorT.notAvailable}
								</Typography>
							</Grid>
						</>
					)}
					{/* Contact Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{entityTitlesT.contact}
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Organization' && (
						<Grid item xs={12}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								{entityFieldT.organization.contactName}
							</Typography>
							<Typography variant='body2'>
								{entity?.organization.contactName ||
									entityFieldT.organization.contactName + ' ' + statusIndicatorT.notAvailable}
							</Typography>
						</Grid>
					)}
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{entityFieldT.contact.phone}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.phone || entityFieldT.contact.phone + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{entityFieldT.contact.email}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.email || entityFieldT.contact.email + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{entityFieldT.contact.socialMedia}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.socialMedia || entityFieldT.contact.socialMedia + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					{/* Address */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{entityTitlesT.location}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body2'>{entity?.address.address || ''}</Typography>
						<Typography variant='body2'>
							{entity?.address.city || ''}
							{entity?.address.state && ', '}
							{GetStateAbbreviation(entity?.address.state || '')} {entity?.address.zip || ''}
						</Typography>
						<Typography variant='body2'>
							{GetCountryAbbreviation(entity?.address.country || '')}{' '}
							{entity?.address.county && `(${entity?.address.county} ${entityFieldT.address.county})`}
						</Typography>
						<Typography variant='body2'></Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EntityDetailsView
