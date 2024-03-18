import React, { useContext, useEffect, FC } from 'react'
import { Grid, Button, Container, Typography, capitalize } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { getVehicles } from '../../store/actions/mongodb/vehicleActions'
import { RootState } from '../../store'
import { Vehicle } from '../../store/types/VehicleTypes'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { ExtractLastFiveDigits } from '../../utils'

const VehicleListView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const navigate = useNavigate()

	// Fetch vehicles from Redux store
	useEffect(() => {
		dispatch(getVehicles())
	}, [dispatch])

	// Access vehicles from Redux store
	const { vehicles, loading, error } = useSelector((state: RootState) => state.vehicles)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Vehicles',
			subheader: 'Vehicles associated with your primary event record',
			extraContent: (
				<Grid container spacing={1}>
					<Grid item>
						<Typography>Total Vehicles: {vehicles.length}</Typography>
					</Grid>
				</Grid>
			),
			returnButton: true,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
			})
		}
	}, [setHeaderData, vehicles.length])

	const handleView = (id: string | undefined) => {
		if (id) {
			navigate(`${id}/details`)
		}
	}

	const handleEdit = (id: string | undefined) => {
		if (id) {
			navigate(`${id}/edit`)
		}
	}

	const handleDelete = (id: string | undefined) => {
		// Implement delete logic as needed
	}

	const columns = [
		{
			id: '_id',
			label: 'ID',
			render: (data: Vehicle) => <Typography>{data._id ? ExtractLastFiveDigits(data._id) : 'N/A'}</Typography>,
		},
		{
			id: 'actions',
			label: 'Actions',
			render: (data: Vehicle) => (
				<ActionsMenu
					onView={() => handleView(data._id ?? '')}
					onEdit={() => handleEdit(data._id ?? '')}
					onDelete={() => handleDelete(data._id ?? '')}
				/>
			),
		},
	]

	return (
		<Container maxWidth='xl'>
			<Grid container justifyContent='flex-end'>
				<Button onClick={() => navigate(`create`)} sx={{ margin: 1 }}>
					<AddCircleOutline sx={{ marginRight: 1 }} /> Add Vehicle
				</Button>
			</Grid>
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<DynamicDataTable
					data={vehicles}
					columns={columns}
					rowsPerPageOptions={[5, 10, 25]}
					pagination={{ rowsPerPage: 5 }}
					page={0}
					onPageChange={(newPage) => console.log('Page changed to:', newPage)}
					onRowsPerPageChange={(newRowsPerPage) => console.log('Rows per page changed to:', newRowsPerPage)}
				/>
			)}
		</Container>
	)
}

export default VehicleListView
