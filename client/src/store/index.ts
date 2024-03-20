import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import rootReducer from './reducers'

const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AsyncAppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store
