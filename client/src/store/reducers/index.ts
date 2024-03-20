import { combineReducers } from 'redux'
import entityReducer from './mongodb/entityReducer'
import eventReducer from './mongodb/eventReducer'
import userReducer from './mongodb/userReducer'
import vehicleReducer from './mongodb/vehicleReducer'

const rootReducer = combineReducers({
	user: userReducer,
	events: eventReducer,
	entities: entityReducer,
	vehicles: vehicleReducer,
})

export default rootReducer
