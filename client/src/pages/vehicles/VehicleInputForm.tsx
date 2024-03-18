import React, { useState, useEffect, ChangeEvent, FormEvent, FC, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { Vehicle, initialState } from '../../store/types/VehicleTypes'
import { updateVehicle, createVehicle, readVehicle } from '../../store/actions/mongodb/vehicleActions'
import { Container, Typography, TextField, Button, CircularProgress, Grid, Divider } from '@mui/material'
import { HeaderContext } from '../../contexts/HeaderContext'

interface VehicleInputFormProps {
	vehicleValues?: Vehicle
}

const VehicleInputForm: FC<VehicleInputFormProps> = ({ vehicleValues }) => {
	console.log('Vehicle Input Form:', vehicleValues)
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()
	const { eventId, vehicleId } = useParams<{ eventId: string; vehicleId?: string }>()

	useEffect(() => {
		console.log('vehcileID:', vehicleId)
		// Fetch vehilce details from Redux store
		if (vehicleId) {
			dispatch(readVehicle(vehicleId))
		}
	}, [dispatch, vehicleId])

	const { loading, error, vehicle } = useSelector((state: RootState) => state.vehicles)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: vehicleValues ? 'Update Vehicle' : 'Add Vehicle',
			subheader: vehicleValues ? 'Update an existing vehicle' : 'Add a new vehicle',
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

	const [formData, setFormData] = useState<Vehicle>({
		_id: vehicleValues?._id || '',
		parent: {
			_id: eventId!,
			name: '',
		},
		make: vehicleValues?.make || '',
		model: vehicleValues?.model || '',
		year: vehicleValues?.year || 0,
		color: vehicleValues?.color || '',
		owner: vehicleValues?.owner || '',
		driver: vehicleValues?.driver || '',
		passengers: vehicleValues?.passengers || [],
		registration: {
			plateNumber: vehicleValues?.registration.plateNumber || '',
			expirationDate: vehicleValues?.registration.expirationDate || new Date(),
			state: vehicleValues?.registration.state || '',
		},
		insurance: {
			policyNumber: vehicleValues?.insurance?.policyNumber || '',
			provider: vehicleValues?.insurance?.provider || '',
			expirationDate: vehicleValues?.insurance?.expirationDate || new Date(),
			insured: vehicleValues?.insurance?.insured || false,
		},
		stolen: vehicleValues?.stolen || false,
		illegalModifications: {
			wasModified: vehicleValues?.illegalModifications?.wasModified || false,
			description: vehicleValues?.illegalModifications?.description || '',
		},
	})
	const [formSubmitted, setFormSubmitted] = useState(false)

	useEffect(() => {
		if (vehicle) {
			setFormData(vehicle)
		}
	}, [vehicle])

	return <Container>{loading && <CircularProgress />}</Container>
}

export default VehicleInputForm
