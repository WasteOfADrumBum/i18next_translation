import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'

const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AsyncAppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store
