import { SET_USER, CLEAR_USER } from '../actions/userActionTypes'

const initialState = {
	user: null, // Initial user state
}

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload,
			}
		case CLEAR_USER:
			return {
				...state,
				user: null,
			}
		default:
			return state
	}
}

export default userReducer
