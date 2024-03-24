import { AddCircleOutline } from '@mui/icons-material'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { getVehicles } from '../../store/actions/mongodb/vehicleActions'
import { Vehicle } from '../../store/types/VehicleTypes'
import { ExtractLastFiveDigits, getVehiclesByEventId } from '../../utils'

const VehicleListView: FC = () => {
	const { t } = useTranslation()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()
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
	const { entities } = useSelector((state: RootState) => state.entities)

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
		return t('common.statusIndicator.na')
	}

	// Make a new array of vehicles that are associated with the current event
	const eventVehicles = getVehiclesByEventId(vehicles, eventId ?? '')

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: t('pages.vehicles.header.title.all'),
			subheader: t('pages.vehicles.header.subtitle.all'),
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages.vehicles.fields.id')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{eventId}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					{entities.length > 0 ? (
						<>
							<Grid item xs={6}>
								<Typography variant='caption'>{t('pages.vehicles.header.content.total')}:</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography variant='caption' color={'primary'}>
									{vehicles.length}
								</Typography>
							</Grid>
						</>
					) : (
						<Grid item xs={12}>
							<Typography variant='caption' color={'secondary'}>
								{t('common.forms.vehiclesRequireEntities')}
							</Typography>
						</Grid>
					)}
				</Grid>
			),
			returnButton: true,
			returnPath: 'dashboard',
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: '',
				subheader: '',
				extraContent: null,
			})
		}
	}, [setHeaderData, vehicles.length, eventId, entities.length, t])

	const handleView = (id: string | undefined) => {
		if (id) {
			navigate(`${id}`)
		}
	}

	const handleEdit = (id: string | undefined) => {
		if (id) {
			navigate(`${id}/edit`)
		}
	}

	const handleDelete = (id: string | undefined) => {
		// Implement delete logic as needed
		console.log('Delete:', id)
	}

	const columns = [
		{
			id: '_id',
			label: t('pages.vehicles.fields.id'),
			render: (data: Vehicle) => (
				<Typography>{data._id ? ExtractLastFiveDigits(data._id) : t('common.statusIndicator.na')}</Typography>
			),
		},
		{
			id: 'description',
			label: t('pages.vehicles.titles.description'),
			render: (data: Vehicle) => (
				<Typography>
					{data.year ? data.year : ''} {data.make ? data.make : ''} {data.model ? data.model : ''}{' '}
					{data.color ? `(${data.color})` : ''}
				</Typography>
			),
		},
		{
			id: 'driver',
			label: t('pages.vehicles.fields.occupants.driver'),
			render: (data: Vehicle) => (
				<Typography>
					{data.occupants.driver ? getEntityName(data.occupants.driver) : t('common.statusIndicator.na')}{' '}
				</Typography>
			),
		},
		{
			id: 'occupants',
			label: t('pages.vehicles.titles.occupants'),
			render: (data: Vehicle) => (
				<Typography>
					{data.occupants.passengers
						? data.occupants.passengers.map((passengerId) => getEntityName(passengerId)).join(', ')
						: t('common.statusIndicator.na')}
				</Typography>
			),
		},
		{
			id: 'actions',
			label: t('common.tables.actions'),
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
				{entities.length > 0 && (
					<Button onClick={() => navigate(`create`)} sx={{ margin: 1 }}>
						<AddCircleOutline sx={{ marginRight: 1 }} /> {t('pages.vehicles.buttons.new')}
					</Button>
				)}
			</Grid>
			{loading ? (
				<Typography variant='h6'>{t('common.statusIndicator.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicator.error')}: {error.toString()}
				</Typography>
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
