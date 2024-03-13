import { combineReducers } from 'redux'
import userReducer from './mongodb/userReducer'
import eventReducer from './mongodb/eventReducer'

const rootReducer = combineReducers({
	user: userReducer,
	events: eventReducer,
})

export default rootReducer
