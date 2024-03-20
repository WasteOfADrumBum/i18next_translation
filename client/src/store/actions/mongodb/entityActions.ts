import axios from 'axios'
import { AppDispatch } from '../../../store'
import { Entity } from '../../types/EntityTypes'

// Entity types
import * as entityTypes from '../../types/constants/entityConstants'

// Set the base URL to your server's address
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

// @Route   GET api/entities
// @Desc    Read All Entities
// @Entity  getEntities()
// @Access  Private
export const getEntities = () => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[32mGet Entities\x1b[0m')
	try {
		const res = await axiosInstance.get('/entities')
		dispatch({
			type: entityTypes.GET_ENTITIES_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				type: entityTypes.GET_ENTITIES_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
			dispatch({
				type: entityTypes.GET_ENTITIES_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   GET api/entities/:id
// @Desc    Read Entity by ID
// @Entity  readEntity()
// @Access  Private
export const readEntity = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[32mRead Entity\x1b[0m')
	console.log('\x1b[36mMongoDB:\x1b[0m Entity Entity ID \x1b[32m' + id + '\x1b[0m')
	try {
		const res = await axiosInstance.get(`/entities/${id}`)
		dispatch({
			type: entityTypes.GET_ENTITY_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				type: entityTypes.GET_ENTITY_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
			dispatch({
				type: entityTypes.GET_ENTITY_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   POST api/entities
// @Desc    Create Entity
// @Entity  createEntity()
// @Access  Private
export const createEntity = (event: Entity) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[32mCreate Entity\x1b[0m')
	try {
		const res = await axiosInstance.post('/entities', event)
		dispatch({
			type: entityTypes.CREATE_ENTITY_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				type: entityTypes.CREATE_ENTITY_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
			dispatch({
				type: entityTypes.CREATE_ENTITY_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   PUT api/entities/:id
// @Desc    Update Entity
// @Entity  updateEntity()
// @Access  Private
export const updateEntity = (event: Entity) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[32mUpdate Entity\x1b[0m')
	try {
		const res = await axiosInstance.put(`/entities/${event._id}`, event)
		dispatch({
			type: entityTypes.UPDATE_ENTITY_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				type: entityTypes.UPDATE_ENTITY_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
			dispatch({
				type: entityTypes.UPDATE_ENTITY_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   DELETE api/entities/:id
// @Desc    Delete Entity
// @Entity  deleteEntity()
// @Access  Private
export const deleteEntity = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[32mDelete Entity\x1b[0m')
	try {
		await axiosInstance.delete(`/entities/${id}`)
		dispatch({
			type: entityTypes.DELETE_ENTITY_SUCCESS,
			payload: id,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				type: entityTypes.DELETE_ENTITY_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
			dispatch({
				type: entityTypes.DELETE_ENTITY_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}
