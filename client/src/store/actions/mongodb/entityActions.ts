import axios from 'axios'
import { Entity } from '../../types/EntityTypes'
import { AppDispatch } from '../../../store'
import translations from '../../../i18n/locales'

// Entity types
import * as entityTypes from '../../types/constants/entityConstants'

// Set the base URL to your server's address
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

// Error translations
const errorTranslations = translations.errors

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
	} catch (err: any) {
		if (err.response.data.errors) {
			dispatch({
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}

		dispatch({
			type: entityTypes.GET_ENTITIES_FAILURE,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
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
	} catch (err: any) {
		if (err.response.data.errors) {
			console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mError\x1b[0m')
			dispatch({
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}

		console.log('\x1b[36mMongoDB:\x1b[0m Entity \x1b[31mFailure\x1b[0m')
		dispatch({
			type: entityTypes.GET_ENTITY_FAILURE,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
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
	} catch (err: any) {
		if (err.response.data.errors) {
			dispatch({
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}

		dispatch({
			type: entityTypes.CREATE_ENTITY_FAILURE,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
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
	} catch (err: any) {
		if (err.response.data.errors) {
			dispatch({
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}

		dispatch({
			type: entityTypes.UPDATE_ENTITY_FAILURE,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
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
	} catch (err: any) {
		if (err.response.data.errors) {
			dispatch({
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}

		dispatch({
			type: entityTypes.DELETE_ENTITY_FAILURE,
			payload: { msg: err.response.statusText, status: err.response.status },
		})
	}
}
