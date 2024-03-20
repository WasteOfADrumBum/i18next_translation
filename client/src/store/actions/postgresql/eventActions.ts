// client\src\store\actions\postgresql\eventActions.ts

import axios from 'axios'
import { Dispatch } from 'redux'
import {
	ADD_EVENT,
	DELETE_EVENT,
	Event,
	EventActionTypes,
	GET_EVENTS,
	UPDATE_EVENT,
} from '../../../../types/events/EventTypesPG'

// Action creators
export const getEvents = () => async (dispatch: Dispatch<EventActionTypes>) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		const res = await axios.get('/api/events') // Adjust the API endpoint accordingly
		dispatch({
			type: GET_EVENTS,
			payload: res.data,
		})
	} catch (error) {
		console.error('Error fetching events:', error)
	}
}

export const addEvent = (newEvent: Event) => async (dispatch: Dispatch<EventActionTypes>) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mCreate Event\x1b[0m')
	try {
		const res = await axios.post('/api/events', newEvent) // Adjust the API endpoint accordingly
		dispatch({
			type: ADD_EVENT,
			payload: res.data,
		})
	} catch (error) {
		console.error('Error adding event:', error)
	}
}

export const updateEvent = (updatedEvent: Event) => async (dispatch: Dispatch<EventActionTypes>) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mUpdate Event\x1b[0m')
	try {
		const res = await axios.put(`/api/events/${updatedEvent.id}`, updatedEvent) // Adjust the API endpoint accordingly
		dispatch({
			type: UPDATE_EVENT,
			payload: res.data,
		})
	} catch (error) {
		console.error('Error updating event:', error)
	}
}

export const deleteEvent = (eventId: number) => async (dispatch: Dispatch<EventActionTypes>) => {
	console.log('\x1b[36mPostgreSQL:\x1b[0m Action \x1b[32mDelete Event\x1b[0m')
	try {
		const res = await axios.delete(`/api/events/${eventId}`) // Adjust the API endpoint accordingly
		dispatch({
			type: DELETE_EVENT,
			payload: eventId,
		})
	} catch (error) {
		console.error('Error deleting event:', error)
	}
}
