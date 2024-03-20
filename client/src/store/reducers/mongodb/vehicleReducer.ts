import * as actionTypes from '../../types/constants/vehicleConstants'
import { initialState, Vehicle, VehicleAction, VehicleState } from '../../types/VehicleTypes'

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
				success: { message: 'Vehicle created successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.DELETE_VEHICLE_SUCCESS:
			return {
				...state,
				vehicles: state.vehicles.filter((vehicle) => vehicle._id !== action.payload),
				loading: false,
				success: { message: 'Vehicle deleted successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.UPDATE_VEHICLE_SUCCESS:
		case actionTypes.GET_VEHICLE_SUCCESS:
			return {
				...state,
				vehicle: action.payload as Vehicle,
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.GET_VEHICLES_SUCCESS:
			return {
				...state,
				vehicles: action.payload as unknown as Vehicle[],
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.CREATE_VEHICLE_FAILURE:
		case actionTypes.DELETE_VEHICLE_FAILURE:
		case actionTypes.UPDATE_VEHICLE_FAILURE:
		case actionTypes.GET_VEHICLES_FAILURE:
		case actionTypes.GET_VEHICLE_FAILURE:
			return {
				...state,
				loading: false,
				error: { message: 'Operation failed', errorCode: 500 },
			}
		default:
			return state
	}
}

export default vehicleReducer
