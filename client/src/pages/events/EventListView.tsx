import React, { useContext, useEffect, FC, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, Container, Grid, Typography } from '@mui/material'
import { AddCircleOutline } from '@mui/icons-material'
import translations from '../../i18n/locales'
import { DynamicDataTable, ActionsMenu } from '../../components'
import { getEvents } from '../../store/actions/mongodb/eventActions'
import { HeaderContext } from '../../contexts/HeaderContext'
import { useNavigate } from 'react-router-dom'
import { Event, EventState } from '../../store/types/EventTypes'

const eventHeaderTranslations = translations.pages.events.header
const eventTableTranslations = translations.pages.events.table.labels

const EventListView: FC = () => {
	const navigate = useNavigate()
	const { setHeaderData } = useContext(HeaderContext)
	const dispatch: Dispatch<any> = useDispatch()
	const [events, setEvents] = useState<Event[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const eventData = await dispatch(getEvents())
				console.log(eventData)
				return eventData
			} catch (error) {
				console.error('Error fetching events:', error)
			}
		}

		fetchData()
	}, [])

	const handleView = (id: string | undefined) => {
		if (id) {
			navigate(`/dashboard/event/${id}/details`)
		}
	}

	const handleEdit = (id: string | undefined) => {
		if (id) {
			navigate(`/event/${id}/edit`)
		}
	}

	const handleDelete = (id: string | undefined) => {
		if (id) {
			console.log('Delete action for row:', id)
		}
	}

	const columns = [
		{ id: '_id', label: eventTableTranslations.id },
		{ id: 'eventDate', label: eventTableTranslations.eventDate },
		{ id: 'eventType', label: eventTableTranslations.eventType },
		{ id: 'eventSubType', label: eventTableTranslations.eventSubtype },
		{ id: 'location', label: eventTableTranslations.location },
		{ id: 'reporter', label: eventTableTranslations.reporter },
		{ id: 'recordedDate', label: eventTableTranslations.recordedDate },
		{ id: 'lastUpdatedBy', label: eventTableTranslations.lastUpdatedBy },
		{ id: 'status', label: eventTableTranslations.status },
		{
			id: 'actions',
			label: eventTableTranslations.actions,
			render: (data: Event) => (
				<ActionsMenu
					onView={() => handleView(data.id ?? '')}
					onEdit={() => handleEdit(data.id ?? '')}
					onDelete={() => handleDelete(data.id ?? '')}
				/>
			),
		},
	]

	return (
		<Container maxWidth='xl'>
			<Grid container justifyContent='flex-end'>
				<Button onClick={() => navigate('/event/create')} sx={{ margin: 1 }}>
					<AddCircleOutline sx={{ marginRight: 1 }} /> Add Event
				</Button>
			</Grid>
			<DynamicDataTable
				data={events}
				columns={columns}
				rowsPerPageOptions={[5, 10, 25]}
				pagination={{ rowsPerPage: 5 }}
				page={0}
				onPageChange={(newPage) => console.log('Page changed to:', newPage)}
				onRowsPerPageChange={(newRowsPerPage) => console.log('Rows per page changed to:', newRowsPerPage)}
			/>
		</Container>
	)
}

export default EventListView
