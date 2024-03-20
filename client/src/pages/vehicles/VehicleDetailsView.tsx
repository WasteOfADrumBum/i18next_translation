import { Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { RootState } from 'store'
import { HeaderContext } from '../../contexts/HeaderContext'
import { readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { GetStateAbbreviation } from '../../utils'

const VehicleDetailsView: FC = () => {
const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId: string }>()

		// Fetch vehcile details from Redux store
	useEffect(() => {
		if (vehicleId) {
			// Check if vehicleId is not undefined
			dispatch(readVehicle(vehicleId))
		}
	}, [dispatch, vehicleId])

	// Access vehicle details from Redux store
	const { vehicle, loading, error } = useSelector((state: RootState) => state.vehicles)

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
