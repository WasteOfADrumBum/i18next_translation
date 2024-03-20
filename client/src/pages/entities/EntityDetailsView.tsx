import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RootState } from 'store'
import { HeaderContext } from '../../contexts/HeaderContext'
import { readEntity } from '../../store/actions/mongodb/entityActions'
import { GetCountryAbbreviation, GetStateAbbreviation } from '../../utils'

const EntityDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
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
			header: 'Entity Details',
			subheader: 'Details for your entity record',
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Entity ID:</Typography>
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
								<Typography variant='caption'>Entity Type:</Typography>
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
				header: 'React MUI Template',
				subheader: 'A template for building React applications with Material-UI',
				extraContent: null,
			})
		}
	}, [setHeaderData, entity, eventId])
	console.log(entity)

	return (
		<Container maxWidth='xl'>
			{/* Display event details */}
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<Grid container spacing={2}>
					{/* Entity Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Entity Information
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Person' && (
						<>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Name
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
									DOB/Age
								</Typography>
								<Typography variant='body2'>
									{entity?.person.dob && `${new Date(entity?.person.dob).toLocaleDateString()}`}
									{entity?.person.age && ` (${entity?.person.age})`}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Native Language
								</Typography>
								<Typography variant='body2'>
									{entity?.person.nativeLanguage || 'No native language provided.'}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									Identification
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									SSN
								</Typography>
								<Typography variant='body2'>{entity?.person.identification.ssn || 'No SSN provided.'}</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Passport Number
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.passportCountry &&
										GetCountryAbbreviation(entity?.person.identification.passportCountry) + ' '}
									{entity?.person.identification.passportNumber || 'No passport number provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Driver License Number
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.driverLicenseState &&
										GetStateAbbreviation(entity?.person.identification.driverLicenseState) + ' '}
									{entity?.person.identification.driverLicenseNumber || 'No driver license number provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									National ID Number
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.nationalIdNumber || 'No national ID number provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Visa Type
								</Typography>
								<Typography variant='body2'>
									{entity?.person.identification.visaType || 'No visa provided.'}
									{entity?.person.identification.visaType &&
										entity?.person.identification.visaExpiryDate &&
										` (Expires: ${new Date(entity?.person.identification.visaExpiryDate).toLocaleDateString()})`}
								</Typography>
							</Grid>
							{(entity?.person.identification.isIllegalResident && (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										Illegal Status Description
									</Typography>
									<Typography variant='body2'>
										{entity?.person.identification.illegalStatusDescription ||
											'No illegal status description provided.'}
									</Typography>
								</Grid>
							)) || (
								<Grid item xs={3}>
									<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
										Legal Resident
									</Typography>
									<Typography variant='body2'>Yes</Typography>
								</Grid>
							)}
							<Grid item xs={12}>
								<Typography variant='h4' color={'primary'} mb={1}>
									Employment
								</Typography>
								<Divider />
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Job Title
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.jobTitle || 'No job title provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Department
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.department || 'No department provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Employee ID
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employeeId || 'No employee ID provided.'}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Hire Date
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.hireDate &&
										`${new Date(entity?.person.employment.hireDate).toLocaleDateString()}`}
								</Typography>
							</Grid>
							<Grid item xs={3}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Employment Status
								</Typography>
								<Typography variant='body2'>
									{entity?.person.employment.employmentStatus || 'No employment status provided.'}
								</Typography>
							</Grid>
						</>
					)}
					{entity?.type === 'Organization' && (
						<>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Legal Name
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalName || 'No legal name provided.'}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Legal Entity Type
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalEntityType || 'No legal entity type provided.'}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Legal Status
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.legalStatus || 'No legal status provided.'}
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Incorporation Date
								</Typography>
								<Typography variant='body2'></Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
									Business Registration Number
								</Typography>
								<Typography variant='body2'>
									{entity?.organization.legal.businessRegistrationNumber || 'No business registration number provided.'}
								</Typography>
							</Grid>
						</>
					)}
					{/* Contact Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Contact Information
						</Typography>
						<Divider />
					</Grid>
					{entity?.type === 'Organization' && (
						<Grid item xs={12}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								Contact Name
							</Typography>
							<Typography variant='body2'>{entity?.organization.contactName || 'No contact name provided.'}</Typography>
						</Grid>
					)}
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Phone
						</Typography>
						<Typography variant='body2'>{entity?.contact.phone || 'No phone provided.'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Email
						</Typography>
						<Typography variant='body2'>{entity?.contact.email || 'No email provided.'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Social Media
						</Typography>
						<Typography variant='body2'>{entity?.contact.socialMedia || 'No social media provided.'}</Typography>
					</Grid>
					{/* Address */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Address
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
							{entity?.address.county && `(${entity?.address.county} County)`}
						</Typography>
						<Typography variant='body2'></Typography>
					</Grid>
				</Grid>
			)}
		</Container>
	)
}

export default EntityDetailsView
