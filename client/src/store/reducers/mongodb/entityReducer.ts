import * as actionTypes from '../../types/constants/entityConstants'
import { Entity, EntityAction, EntityState, initialState } from '../../types/EntityTypes'

const entityReducer = (state: EntityState = initialState, action: EntityAction): EntityState => {
	switch (action.type) {
		case actionTypes.CREATE_ENTITY_REQUEST:
		case actionTypes.DELETE_ENTITY_REQUEST:
		case actionTypes.UPDATE_ENTITY_REQUEST:
		case actionTypes.GET_ENTITIES_REQUEST:
		case actionTypes.GET_ENTITY_REQUEST:
			return {
				...state,
				loading: true,
			}
		case actionTypes.CREATE_ENTITY_SUCCESS:
			return {
				...state,
				loading: false,
				success: { message: 'Entity created successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.DELETE_ENTITY_SUCCESS:
			return {
				...state,
				entities: state.entities.filter((entity) => entity._id !== action.payload),
				loading: false,
				success: { message: 'Entity deleted successfully', data: action.payload },
				error: undefined,
			}
		case actionTypes.UPDATE_ENTITY_SUCCESS:
		case actionTypes.GET_ENTITY_SUCCESS:
			return {
				...state,
				entity: action.payload as Entity,
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.GET_ENTITIES_SUCCESS:
			return {
				...state,
				entities: action.payload as unknown as Entity[],
				loading: false,
				success: { message: 'Operation successful', data: action.payload },
				error: undefined,
			}
		case actionTypes.CREATE_ENTITY_FAILURE:
		case actionTypes.DELETE_ENTITY_FAILURE:
		case actionTypes.UPDATE_ENTITY_FAILURE:
		case actionTypes.GET_ENTITIES_FAILURE:
		case actionTypes.GET_ENTITY_FAILURE:
			return {
				...state,
				loading: false,
				error: { message: 'Operation failed', errorCode: 500 },
			}
		default:
			return state
	}
}

export default entityReducer
