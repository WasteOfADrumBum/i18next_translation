import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { TimeConversionsHelper } from '../../utils'

const VehicleDetailsView: FC = () => {
	const { t } = useTranslation()
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
			header: t('pages.vehicles.header.title.single'),
			subheader: t('pages.vehicles.header.subtitle.single'),
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>{t('pages.vehicles.fields.id')}:</Typography>
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
	}, [setHeaderData, vehicle, eventId, t])
	console.log(vehicle)

	return (
		<Container maxWidth='xl'>
			{/* Display vehicle details */}
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
							{t('pages.vehicles.titles.description')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.year')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.year || t('pages.vehicles.fields.year') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.make')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.make || t('pages.vehicles.fields.make') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.model')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.model || t('pages.vehicles.fields.model') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.color')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.color || t('pages.vehicles.fields.color') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.vin')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.vin || t('pages.vehicles.fields.vin') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.vehicles.titles.occupants')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.occupants.driver')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.driver
								? getEntityName(vehicle.occupants.driver)
								: t('pages.vehicles.fields.occupants.driver') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.occupants.passengers')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.occupants?.passengers
								? vehicle.occupants.passengers.map((passenger) => getEntityName(passenger)).join(', ')
								: t('pages.vehicles.fields.occupants.passengers') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.vehicles.titles.registration')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.registration.owner')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.owner
								? getEntityName(vehicle.registration.owner)
								: t('pages.vehicles.fields.registration.owner') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.registration.plateNumber')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.plateNumber.toLocaleUpperCase() ||
								t('pages.vehicles.fields.registration.plateNumber') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.registration.state')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.state ||
								t('pages.vehicles.fields.registration.state') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.registration.expirationDate')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.registration?.expirationDate
								? TimeConversionsHelper.convertTime(
										t,
										vehicle?.registration?.expirationDate,
										'MM/DD/YYYY',
										false,
										'UTC',
									)
								: t('pages.vehicles.fields.registration.expirationDate') +
									' ' +
									t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.vehicles.titles.insurance')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.insurance.policyNumber')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.policyNumber
								? vehicle?.insurance?.policyNumber.toUpperCase()
								: t('pages.vehicles.fields.insurance.policyNumber') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.insurance.provider')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.provider ??
								t('pages.vehicles.fields.insurance.provider') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.insurance.expirationDate')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.expirationDate
								? TimeConversionsHelper.convertTime(t, vehicle?.insurance?.expirationDate, 'MM/DD/YYYY', false, 'UTC')
								: t('pages.vehicles.fields.insurance.expirationDate') + ' ' + t('common.statusIndicator.notAvailable')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.insurance.insured')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.insurance?.insured ? t('common.boolean.yes') : t('common.boolean.no')}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='h4' color={'primary'} mb={1}>
							{t('pages.vehicles.titles.legality')}
						</Typography>
						<Divider />
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.stolen')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.stolen ? t('common.boolean.yes') : t('common.boolean.no')}
						</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
							{t('pages.vehicles.fields.illegalModifications.wasModified')}
						</Typography>
						<Typography variant='body2'>
							{vehicle?.illegalModifications.wasModified ? t('common.boolean.yes') : t('common.boolean.no')}
						</Typography>
					</Grid>
					{vehicle?.illegalModifications.wasModified && (
						<Grid item xs={6}>
							<Typography variant='body1' mb={1} sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
								{t('pages.vehicles.fields.illegalModifications.description')}
							</Typography>
							<Typography variant='body2'>
								{vehicle?.illegalModifications.description ??
									t('pages.vehicles.fields.illegalModifications.description') +
										' ' +
										t('common.statusIndicator.notAvailable')}
							</Typography>
						</Grid>
					)}
				</Grid>
			)}
		</Container>
	)
}

export default VehicleDetailsView
