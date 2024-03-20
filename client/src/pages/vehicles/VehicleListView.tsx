import { AddCircleOutline } from '@mui/icons-material'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Dispatch } from 'redux'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts/HeaderContext'
import { RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { getVehicles } from '../../store/actions/mongodb/vehicleActions'
import { Vehicle } from '../../store/types/VehicleTypes'
import { ExtractLastFiveDigits, getVehiclesByEventId } from '../../utils'

const VehicleListView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const navigate = useNavigate()
	const { eventId } = useParams<{ eventId: string }>()

	// Fetch vehicles from Redux store
	useEffect(() => {
		dispatch(getVehicles())
	}, [dispatch])

	// Access vehicles from Redux store
	const { vehicles, loading, error } = useSelector((state: RootState) => state.vehicles)

	// Fetch entities from Redux store
	useEffect(() => {
		dispatch(getEntities())
	}, [dispatch])

	// Access entities from Redux store
	const { entities, loading: entitiesLoading, error: entitiesError } = useSelector((state: RootState) => state.entities)

	// Get entity name from entity ID
	const getEntityName = (id: string | undefined) => {
		if (id) {
			const entity = entities.find((entity) => entity._id === id)
			if (entity) {
				if (entity.type === 'Person') {
					return `${entity.person.name.first ? entity.person.name.first : ''} ${
						entity.person.name.middle ? entity.person.name.middle : ''
					} ${entity.person.name.last ? entity.person.name.last : ''}`
				} else if (entity.type === 'Organization') {
					return `${entity.organization.legal.legalName ? entity.organization.legal.legalName : ''} (${
						entity.organization.contactName ? entity.organization.contactName : ''
					})`
				}
			}
		}
		return 'N/A'
	}

	// Make a new array of vehicles that are associated with the current event
	const eventVehicles = getVehiclesByEventId(vehicles, eventId ?? '')

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Vehicles',
			subheader: 'Vehicles associated with your primary event record',
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography variant='caption'>Event ID:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color='primary'>
									{eventId}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Divider />
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant='caption'>Total Vehicles: {vehicles.length}</Typography>
					</Grid>
				</Grid>
			),
			returnButton: true,
			returnPath: 'dashboard',
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
			id: 'description',
			label: 'Description',
			render: (data: Vehicle) => (
				<Typography>
					{data.year ? data.year : ''} {data.make ? data.make : ''} {data.model ? data.model : ''}{' '}
					{data.color ? `(${data.color})` : ''}
				</Typography>
			),
		},
		{
			id: 'driver',
			label: 'Driver',
			render: (data: Vehicle) => (
				<Typography>{data.occupants.driver ? getEntityName(data.occupants.driver) : 'N/A'} </Typography>
			),
		},
		{
			id: 'occupants',
			label: 'Occupants',
			render: (data: Vehicle) => (
				<Typography>
					{data.occupants.passengers
						? data.occupants.passengers.map((passengerId) => getEntityName(passengerId)).join(', ')
						: 'N/A'}
				</Typography>
			),
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
					data={eventVehicles}
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
