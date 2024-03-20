import { CLEAR_USER, SET_USER } from './userActionTypes'

export const setUser = (user: unknown) => ({
	type: SET_USER,
	payload: user,
})

export const clearUser = () => ({
	type: CLEAR_USER,
})
