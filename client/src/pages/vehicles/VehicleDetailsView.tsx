import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts'
import translations from '../../i18n/locales'
import { AppDispatch, RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { TimeConversionsHelper } from '../../utils'

const vehicleHeaderT = translations.pages.vehicles.en.header
const vehicleFieldT = translations.pages.vehicles.en.fields
const vehicleTitlesT = translations.pages.vehicles.en.titles
const statusIndicatorT = translations.common.en.statusIndicator
const booleanT = translations.common.en.boolean

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
			header: vehicleHeaderT.title.single,
			subheader: vehicleHeaderT.subtitle.single,
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{vehicleFieldT.id}:</Typography>
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
				header: '',
				subheader: '',
				extraContent: null,
			})
		}
	}, [setHeaderData, vehicle, eventId])
	console.log(vehicle)

	return (
		<Container maxWidth='xl'>
			{/* Display vehicle details */}
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
							{vehicleTitlesT.description}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.year}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.year || vehicleFieldT.year + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.make}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.make || vehicleFieldT.make + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.model}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.model || vehicleFieldT.model + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.color}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.color || vehicleFieldT.color + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.vin}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.vin || vehicleFieldT.vin + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{vehicleTitlesT.occupants}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.occupants.driver}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.driver ? getEntityName(vehicle.occupants.driver) : 'No driver was provided'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.occupants.passengers}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.passengers
								? vehicle.occupants.passengers.map((passenger) => getEntityName(passenger)).join(', ')
								: vehicleFieldT.occupants.passengers + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{vehicleTitlesT.registration}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.registration.owner}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.owner
								? getEntityName(vehicle.registration.owner)
								: vehicleFieldT.registration.owner + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.registration.plateNumber}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.plateNumber.toLocaleUpperCase() ||
								vehicleFieldT.registration.plateNumber + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.registration.state}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.state || vehicleFieldT.registration.state + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.registration.expirationDate}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.expirationDate
								? TimeConversionsHelper.convertTime(vehicle?.registration?.expirationDate, 'MM/DD/YYYY', false, 'UTC')
								: vehicleFieldT.registration.expirationDate + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{vehicleTitlesT.insurance}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.insurance.policyNumber}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.policyNumber
								? vehicle?.insurance?.policyNumber.toUpperCase()
								: vehicleFieldT.insurance.policyNumber + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.insurance.provider}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.provider ?? vehicleFieldT.insurance.provider + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.insurance.expirationDate}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.expirationDate
								? TimeConversionsHelper.convertTime(vehicle?.insurance?.expirationDate, 'MM/DD/YYYY', false, 'UTC')
								: vehicleFieldT.insurance.expirationDate + ' ' + statusIndicatorT.notAvailable}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.insurance.insured}
						</Typography>
						<Typography variant='body2'>{vehicle?.insurance?.insured ? booleanT.yes : booleanT.no}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{vehicleTitlesT.legality}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.stolen}
						</Typography>
						<Typography variant='body2'>{vehicle?.stolen ? booleanT.yes : booleanT.no}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{vehicleFieldT.illegalModifications.wasModified}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.illegalModifications.wasModified ? booleanT.yes : booleanT.no}
						</Typography>
					</Grid>
					{vehicle?.illegalModifications.wasModified && (
						<Grid item xs={6}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								{vehicleFieldT.illegalModifications.description}
							</Typography>
							<Typography variant='body2'>
								{vehicle?.illegalModifications.description ??
									vehicleFieldT.illegalModifications.description + ' ' + statusIndicatorT.notAvailable}
							</Typography>
						</Grid>
					)}
				</Grid>
			)}
		</Container>
	)
}

export default VehicleDetailsView
