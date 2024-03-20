import { Entity } from '../../store/types/EntityTypes'
import { Vehicle } from '../../store/types/VehicleTypes'

// Based on the current event ID, filter vehicles associated with the event
export const getVehiclesByEventId = (vehicles: Vehicle[], eventId: string) => {
	return vehicles.filter((vehicle) => vehicle.parent._id === eventId)
}

// Based on the current event ID, filter entities associated with the event
export const getEntitiesByEventId = (entities: Entity[], eventId: string) => {
	return entities.filter((entity) => entity.parent._id === eventId)
}
