import { CLEAR_USER, SET_USER } from '../../actions/mongodb/userActionTypes'
import { UserAction } from '../../types/UserTypes'

const initialState = {
	user: null, // Initial user state
}

const userReducer = (state = initialState, action: UserAction) => {
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
