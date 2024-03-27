import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { readEntity } from '../../store/actions/mongodb/entityActions'
import { getCountryAbbreviations, getStateAbbreviations, getTimeConversion } from '../../utils'

const EntityDetailsView: FC = () => {
	const { t } = useTranslation()
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
			header: t('pages.entities.header.title.single'),
			subheader: t('pages.entities.header.subtitle.single'),
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{t('pages.entities.fields.id')}:</Typography>
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
								<Typography variant='caption'>{t('pages.entities.fields.type')}:</Typography>
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
	}, [setHeaderData, entity, eventId, t])
	console.log(entity)

	return (
		<Container maxWidth='xl'>
			{/* Display event details */}
			{loading ? (
				<Typography variant='h6'>{t('common.statusIndicator.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
			) : (
				<Grid container spacing={2}>
					{/* Entity Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.entities.titles.identification')}
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Person' && (
						<>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.titles.name')}
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
									{t('pages.entities.fields.person.dob')} ({t('pages.entities.fields.person.age')})
								</Typography>
								<Typography variant='body2'>
									{entity?.person.dob
										? getTimeConversion.convertTime(t, entity?.person.dob, 'MM/DD/YYYY', false, 'UTC')
										: t('pages.entities.fields.person.dob') + ' ' + t('common.statusIndicator.notAvailable')}
									{entity?.person.age ||
										t('pages.entities.fields.person.age') + ' ' + t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.nativeLanguage')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.nativeLanguage ||
										t('pages.entities.fields.person.nativeLanguage') + ' ' + t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									{t('pages.entities.titles.identification')}
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.identification.ssn')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.ssn ||
										t('pages.entities.fields.person.identification.ssn') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.titles.passport')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.passportCountry &&
										getCountryAbbreviations(entity?.person.identification.passportCountry) + ' '}
									{entity?.person.identification.passportNumber ||
										t('pages.entities.fields.person.identification.passportNumber') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.titles.driverLicense')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.driverLicenseState &&
										getStateAbbreviations(entity?.person.identification.driverLicenseState) + ' '}
									{entity?.person.identification.driverLicenseNumber ||
										t('pages.entities.fields.person.identification.driverLicenseNumber') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.identification.nationalIdNumber')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.nationalIdNumber ||
										t('pages.entities.fields.person.identification.nationalIdNumber') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.identification.visaType')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.visaType ||
										t('pages.entities.fields.person.identification.visaType') +
											' ' +
											t('common.statusIndicator.notAvailable')}
									{entity?.person.identification.visaType &&
										entity?.person.identification.visaExpiryDate &&
										` (${t('common.statusIndicator.expires')}: ${getTimeConversion.convertTime(t, entity?.person.identification.visaExpiryDate, 'MM/DD/YYYY', false, 'UTC')})`}
								</Typography>
							</Grid>
							{(entity?.person.identification.isIllegalResident && (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										{t('pages.entities.fields.person.identification.isIllegalResident')}
									</Typography>
									<Typography variant='body2'>
										{entity?.person.identification.illegalStatusDescription ||
											t('pages.entities.fields.person.identification.illegalStatusDescription') +
												' ' +
												t('common.statusIndicator.notAvailable')}
									</Typography>
								</Grid>
							)) || (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										{t('pages.entities.fields.person.identification.isIllegalResident')}
									</Typography>
									<Typography variant='body2'>Yes</Typography>
								</Grid>
							)}
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									{t('pages.entities.titles.employment')}
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.employment.jobTitle')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.jobTitle ||
										t('pages.entities.fields.person.employment.jobTitle') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.employment.department')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.department ||
										t('pages.entities.fields.person.employment.department') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.employment.employeeId')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employeeId ||
										t('pages.entities.fields.person.employment.employeeId') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.employment.hireDate')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.hireDate
										? getTimeConversion.convertTime(t, entity?.person.employment.hireDate, 'MM/DD/YYYY', false, 'UTC')
										: t('pages.entities.fields.person.employment.hireDate') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.person.employment.employmentStatus')}
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employmentStatus ||
										t('pages.entities.fields.person.employment.employmentStatus') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
						</>
					)}
					{entity?.type === 'Organization' && (
						<>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.organization.legal.legalName')}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalName ||
										t('pages.entities.fields.organization.legal.legalName') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.organization.legal.legalEntityType')}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalEntityType ||
										t('pages.entities.fields.organization.legal.legalEntityType') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.organization.legal.legalStatus')}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalStatus ||
										t('pages.entities.fields.organization.legal.legalStatus') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.organization.legal.incorporationDate')}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.incorporationDate
										? getTimeConversion.convertTime(
												t,
												entity?.organization.legal.incorporationDate,
												'MM/DD/YYYY',
												false,
												'UTC',
											)
										: t('pages.entities.fields.organization.legal.incorporationDate') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									{t('pages.entities.fields.organization.legal.businessRegistrationNumber')}
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.businessRegistrationNumber ||
										t('pages.entities.fields.organization.legal.businessRegistrationNumber') +
											' ' +
											t('common.statusIndicator.notAvailable')}
								</Typography>
							</Grid>
						</>
					)}
					{/* Contact Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.entities.titles.contact')}
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Organization' && (
						<Grid item xs={12}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								{t('pages.entities.fields.organization.contactName')}
							</Typography>
							<Typography variant='body2'>
								{entity?.organization.contactName ||
									t('pages.entities.fields.organization.contactName') + ' ' + t('common.statusIndicator.notAvailable')}
							</Typography>
						</Grid>
					)}
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.entities.fields.contact.phone')}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.phone ||
								t('pages.entities.fields.contact.phone') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.entities.fields.contact.email')}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.email ||
								t('pages.entities.fields.contact.email') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.entities.fields.contact.socialMedia')}
						</Typography>
						<Typography variant='body2'>
							{entity?.contact.socialMedia ||
								t('pages.entities.fields.contact.socialMedia') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					{/* Address */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.entities.titles.location')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body2'>{entity?.address.address || ''}</Typography>
						<Typography variant='body2'>
							{entity?.address.city || ''}
							{entity?.address.state && ', '}
							{getStateAbbreviations(entity?.address.state || '')} {entity?.address.zip || ''}
						</Typography>
						<Typography variant='body2'>
							{getCountryAbbreviations(entity?.address.country || '')}{' '}
							{entity?.address.county && `(${entity?.address.county} ${t('pages.entities.fields.address.county')})`}
						</Typography>
						<Typography variant='body2'></Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EntityDetailsView
