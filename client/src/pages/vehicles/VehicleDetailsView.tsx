import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { AppDispatch, RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { TimeConversionsHelper } from '../../utils'

const VehicleDetailsView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId: string }>()

	// Fetch vehcile details from Redux store
	useEffect(() => {
		if (vehicleId) {
			// Check if vehicleId is not undefined
			dispatch(readVehicle(vehicleId))
		}
	}, [dispatch, vehicleId])

	// Access vehicle details from Redux store
	const { vehicle, error, loading } = useSelector((state: RootState) => state.vehicles)

	// Fetch user details from Redux store
	useEffect(() => {
		if (eventId) {
			// Check if eventId is not undefined
			dispatch(getEntities())
		}
	}, [dispatch, eventId])

	// Access user details from Redux store
	const { entities } = useSelector((state: RootState) => state.entities)

	// Function to get entity name from its UUID
	const getEntityName = (entityId: string) => {
		const entity = entities.find((entity) => entity._id === entityId)
		if (entity) {
			if (entity.type === 'Person') {
				return `${entity.person.name.first} ${entity.person.name.last}`
			} else if (entity.type === 'Organization') {
				return entity.organization.legal.legalName
			}
		}
		return ''
	}

	// Update header data when component mounts
	useEffect(() => {
		setHeaderData({
			header: 'Vehicle Details',
			subheader: 'Details for your vehicle record',
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Vehicle ID:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{vehicle?._id}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: `dashboard/event/${eventId}/vehicle`,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template',
				subheader: 'A template for building React applications with Material-UI',
				extraContent: null,
			})
		}
	}, [setHeaderData, vehicle, eventId])
	console.log(vehicle)

	return (
		<Container maxWidth='xl'>
			{/* Display vehicle details */}
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<Grid container spacing={2}>
					{/* Entity Information */}
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Description
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Year
						</Typography>
						<Typography variant='body2'>{vehicle?.year || 'No year was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Make
						</Typography>
						<Typography variant='body2'>{vehicle?.make || 'No make was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Model
						</Typography>
						<Typography variant='body2'>{vehicle?.model || 'No model was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Year
						</Typography>
						<Typography variant='body2'>{vehicle?.year || 'No year was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Color
						</Typography>
						<Typography variant='body2'>{vehicle?.color || 'No color was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							VIN
						</Typography>
						<Typography variant='body2'>{vehicle?.vin || 'No VIN was provided'}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Occupants
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Driver
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.driver ? getEntityName(vehicle.occupants.driver) : 'No driver was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Passengers
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.passengers
								? vehicle.occupants.passengers.map((passenger) => getEntityName(passenger)).join(', ')
								: 'No passengers were provided'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Registration
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Owner
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.owner ? getEntityName(vehicle.registration.owner) : 'No owner was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Plate Number
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.plateNumber.toLocaleUpperCase() || 'No plate number was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							State
						</Typography>
						<Typography variant='body2'>{vehicle?.registration?.state || 'No state was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Expiration Date
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.expirationDate
								? TimeConversionsHelper.convertTime(vehicle?.registration?.expirationDate, 'MM/DD/YYYY', false, 'UTC')
								: 'No expiration date was provided'}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Insurance
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Policy Number
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.policyNumber
								? vehicle?.insurance?.policyNumber.toUpperCase()
								: 'No policy number was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Provider
						</Typography>
						<Typography variant='body2'>{vehicle?.insurance?.provider ?? 'No provider was provided'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Expiration Date
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.expirationDate
								? TimeConversionsHelper.convertTime(vehicle?.insurance?.expirationDate, 'MM/DD/YYYY', false, 'UTC')
								: 'No expiration date was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Insured
						</Typography>
						<Typography variant='body2'>{vehicle?.insurance?.insured ? 'Yes' : 'No'}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							Legality
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Stolen
						</Typography>
						<Typography variant='body2'>{vehicle?.stolen ? 'Yes' : 'No'}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							Illegal Modifications
						</Typography>
						<Typography variant='body2'>{vehicle?.illegalModifications.wasModified ? 'Yes' : 'No'}</Typography>
					</Grid>
					{vehicle?.illegalModifications.wasModified && (
						<Grid item xs={6}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								Modifications
							</Typography>
							<Typography variant='body2'>{vehicle?.illegalModifications.description}</Typography>
						</Grid>
					)}
				</Grid>
			)}
		</Container>
	)
}

export default VehicleDetailsView
