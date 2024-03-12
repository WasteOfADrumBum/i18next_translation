import { SET_USER, CLEAR_USER } from './userActionTypes'

export const setUser = (user: any) => ({
	type: SET_USER,
	payload: user,
})

export const clearUser = () => ({
	type: CLEAR_USER,
})
