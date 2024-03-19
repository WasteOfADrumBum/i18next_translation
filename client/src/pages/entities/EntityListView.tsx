import React, { useContext, useEffect, FC } from 'react'
import { Grid, Button, Container, Typography, capitalize, Divider } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderContext } from '../../contexts/HeaderContext'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { RootState } from '../../store'
import { Entity } from '../../store/types/EntityTypes'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { ExtractLastFiveDigits } from '../../utils'

const EntityListView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const navigate = useNavigate()
	const { eventId } = useParams<{ eventId: string }>()

	// Fetch entities from Redux store
	useEffect(() => {
		dispatch(getEntities())
	}, [dispatch])

	// Access entities from Redux store
	const { entities, loading, error } = useSelector((state: RootState) => state.entities)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Entities',
			subheader: 'Entities associated with your primary event record',
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
						<Typography variant='caption'>Total Entities: {entities.length}</Typography>
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
	}, [setHeaderData, entities.length])

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
			render: (data: Entity) => <Typography>{data._id ? ExtractLastFiveDigits(data._id) : 'N/A'}</Typography>,
		},
		{
			id: 'actions',
			label: 'Actions',
			render: (data: Entity) => (
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
					<AddCircleOutline sx={{ marginRight: 1 }} /> Add Entity
				</Button>
			</Grid>
			{loading ? (
				<Typography variant='h6'>Loading...</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>Error: {error.toString()}</Typography>
			) : (
				<DynamicDataTable
					data={entities}
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

export default EntityListView
