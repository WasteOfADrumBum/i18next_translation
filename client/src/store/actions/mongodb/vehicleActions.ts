import axios from 'axios'
import { AppDispatch } from '../../../store'
import { Vehicle } from '../../types/VehicleTypes'

// Action types
import * as actionTypes from '../../types/constants/vehicleConstants'

// Set the base URL to your server's address
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

// @Route   GET api/vehicles
// @Desc    Read All Vehicles
// @Action  getVehicles()
// @Access  Private
export const getVehicles = () => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mGet Vehicles\x1b[0m')
	try {
		const res = await axiosInstance.get('/vehicles')
		dispatch({
			type: actionTypes.GET_VEHICLES_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.GET_VEHICLES_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.GET_VEHICLES_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   GET api/vehicles/:id
// @Desc    Read Vehicle by ID
// @Action  readVehicle()
// @Access  Private
export const readVehicle = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mRead Vehicle\x1b[0m')
	console.log('\x1b[36mMongoDB:\x1b[0m Action Vehicle ID \x1b[32m' + id + '\x1b[0m')
	try {
		const res = await axiosInstance.get(`/vehicles/${id}`)
		dispatch({
			type: actionTypes.GET_VEHICLE_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.GET_VEHICLE_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.GET_VEHICLE_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   POST api/vehicles
// @Desc    Create Vehicle
// @Action  createVehicle()
// @Access  Private
export const createVehicle = (vehicle: Vehicle) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mCreate Vehicle\x1b[0m')
	try {
		const res = await axiosInstance.post('/vehicles', vehicle)
		dispatch({
			type: actionTypes.CREATE_VEHICLE_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.CREATE_VEHICLE_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.CREATE_VEHICLE_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   PUT api/vehicles/:id
// @Desc    Update Vehicle
// @Action  updateVehicle()
// @Access  Private
export const updateVehicle = (vehicle: Vehicle) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mUpdate Vehicle\x1b[0m')
	try {
		const res = await axiosInstance.put(`/vehicles/${vehicle._id}`, vehicle)
		dispatch({
			type: actionTypes.UPDATE_VEHICLE_SUCCESS,
			payload: res.data,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.UPDATE_VEHICLE_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.UPDATE_VEHICLE_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}

// @Route   DELETE api/vehicles/:id
// @Desc    Delete Vehicle
// @Action  deleteVehicle()
// @Access  Private
export const deleteVehicle = (id: string) => async (dispatch: AppDispatch) => {
	console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[32mDelete Vehicle\x1b[0m')
	try {
		await axiosInstance.delete(`/vehicles/${id}`)
		dispatch({
			type: actionTypes.DELETE_VEHICLE_SUCCESS,
			payload: id,
		})
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mError\x1b[0m')
			dispatch({
				type: actionTypes.DELETE_VEHICLE_FAILURE,
				payload: { msg: err.message, status: -1 },
			})
		} else {
			console.log('\x1b[36mMongoDB:\x1b[0m Action \x1b[31mFailure\x1b[0m')
			dispatch({
				type: actionTypes.DELETE_VEHICLE_FAILURE,
				payload: { msg: 'An unknown error occurred', status: -1 },
			})
		}
	}
}
