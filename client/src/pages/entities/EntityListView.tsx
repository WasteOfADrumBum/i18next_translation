import { AddCircleOutline } from '@mui/icons-material'
import { Button, capitalize, Container, Divider, Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionsMenu, DynamicDataTable } from '../../components'
import { HeaderContext } from '../../contexts'
import { AppDispatch, RootState } from '../../store'
import { getEntities } from '../../store/actions/mongodb/entityActions'
import { Entity } from '../../store/types/EntityTypes'
import { getCountryAbbreviation, getEntitiesByEventId, getLastFiveDigits, getStateAbbreviation } from '../../utils'

const EntityListView: FC = () => {
	const { t } = useTranslation()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: AppDispatch = useDispatch()
	const navigate = useNavigate()
	const { eventId } = useParams<{ eventId: string }>()

	// Fetch entities from Redux store
	useEffect(() => {
		dispatch(getEntities())
	}, [dispatch])

	// Access entities from Redux store
	const { entities, loading, error } = useSelector((state: RootState) => state.entities)

	// Make a new array of entities associated with the current event
	const eventEntities = getEntitiesByEventId(entities, eventId ?? '')

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: t('pages.entities.header.title.all'),
			subheader: t('pages.entities.header.subtitle.all'),
			extraContent: (
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages.entities.fields.id')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{eventId}
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption'>{t('pages.entities.header.content.total')}:</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='caption' color='primary'>
							{eventEntities.length}
						</Typography>
					</Grid>
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
	}, [setHeaderData, entities.length, eventId, eventEntities.length, t])

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
			label: t('pages.entities.fields.id'),
			render: (data: Entity) => (
				<Typography>{data._id ? getLastFiveDigits(data._id) : t('common.statusIndicatorT.na')}</Typography>
			),
		},
		{
			id: 'type',
			label: t('pages.entities.fields.type'),
			render: (data: Entity) => <Typography>{capitalize(data.type || t('common.statusIndicatorT.na'))}</Typography>,
		},
		{
			id: 'name',
			label: t('pages.entities.fields.type'),
			render: (data: Entity) => {
				let name = ''
				if (data.type === 'Person') {
					const { first, middle, last, suffix } = data.person.name
					name = `${first || ''} ${middle || ''} ${last || ''} ${suffix || ''}`.trim()
				} else if (data.type === 'Organization') {
					const { contactName } = data.organization
					const { legalName } = data.organization.legal
					name = `${legalName || ''} (${contactName || ''})`.trim() || t('common.statusIndicatorT.na')
				} else {
					name = t('common.statusIndicatorT.na')
				}
				return <Typography>{name}</Typography>
			},
		},
		{
			id: 'location',
			label: t('pages.entities.titles.location'),
			render: (data: Entity) => (
				<Typography>
					{data.address
						? `${data.address.city}, ${getStateAbbreviation(data.address.state || t('common.statusIndicatorT.na'))}, ${getCountryAbbreviation(
								data.address.country || t('common.statusIndicatorT.na'),
							)}`
						: t('common.statusIndicatorT.na')}
				</Typography>
			),
		},
		{
			id: 'actions',
			label: t('common.tables.actions'),
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
					<AddCircleOutline sx={{ marginRight: 1 }} /> {t('pages.entities.buttons.new')}
				</Button>
			</Grid>
			{loading ? (
				<Typography variant='h6'>{t('common.statusIndicatorT.loading')}</Typography>
			) : typeof error === 'object' && Object.keys(error).length !== 0 ? (
				<Typography variant='h6'>
					{t('common.statusIndicatorT.error')}: {error.toString()}
				</Typography>
			) : (
				<DynamicDataTable
					data={eventEntities}
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
