import { Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { AppDispatch, RootState } from '../../store'
import { readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { readEntity } from '../../store/actions/mongodb/entityActions'
import { Entity } from '../../store/types/EntityTypes'

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
	const { vehicle } = useSelector((state: RootState) => state.vehicles)

	// Fetch user details from Redux store
	useEffect(() => {
		if (eventId) {
			// Check if eventId is not undefined
			dispatch(readEntity(eventId))
		}
	}, [dispatch, eventId])

	// Access user details from Redux store
	const { entity } = useSelector((state: RootState) => state.entities)

	// Function to get entity name
	const getEntityName = (entity: Entity) => {
		if (entity?.type === 'Person') {
			return `${entity?.person.name.first} ${entity?.person.name.last}`
		} else if (entity?.type === 'Organization') {
			return entity?.organization.legal.legalName
		} else {
			return ''
		}
	}

	if (entity) console.log(getEntityName(entity))

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

	return <>Vehicle Details</>
}

export default VehicleDetailsView
