import { VehicleState, VehicleAction, initialState } from '../../types/VehicleTypes'
import { Vehicle } from '../../types/VehicleTypes'
import * as actionTypes from '../../types/constants/vehicleConstants'

const vehicleReducer = (state: VehicleState = initialState, action: VehicleAction): VehicleState => {
	switch (action.type) {
		case actionTypes.CREATE_VEHICLE_REQUEST:
		case actionTypes.DELETE_VEHICLE_REQUEST:
		case actionTypes.UPDATE_VEHICLE_REQUEST:
		case actionTypes.GET_VEHICLES_REQUEST:
		case actionTypes.GET_VEHICLE_REQUEST:
			return {
				...state,
				loading: true,
			}
		case actionTypes.CREATE_VEHICLE_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload,
				error: {},
			}
		case actionTypes.DELETE_VEHICLE_SUCCESS:
			return {
				...state,
				vehicles: state.vehicles.filter((vehicle) => vehicle._id !== action.payload),
				loading: false,
				success: action.payload,
				error: {},
			}
		case actionTypes.UPDATE_VEHICLE_SUCCESS:
		case actionTypes.GET_VEHICLE_SUCCESS:
			return {
				...state,
				vehicle: action.payload as Vehicle,
				loading: false,
				success: action.payload,
				error: {},
			}
		case actionTypes.GET_VEHICLES_SUCCESS:
			return {
				...state,
				vehicles: action.payload as unknown as Vehicle[],
				loading: false,
				success: action.payload,
				error: {},
			}
		case actionTypes.CREATE_VEHICLE_FAILURE:
		case actionTypes.DELETE_VEHICLE_FAILURE:
		case actionTypes.UPDATE_VEHICLE_FAILURE:
		case actionTypes.GET_VEHICLES_FAILURE:
		case actionTypes.GET_VEHICLE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export default vehicleReducer
