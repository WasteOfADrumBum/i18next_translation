import { combineReducers } from 'redux'
import userReducer from './mongodb/userReducer'
import eventReducer from './mongodb/eventReducer'
import entityReducer from './mongodb/entityReducer'
import vehicleReducer from './mongodb/vehicleReducer'

const rootReducer = combineReducers({
	user: userReducer,
	events: eventReducer,
	entities: entityReducer,
	vehicles: vehicleReducer,
})

export default rootReducer
