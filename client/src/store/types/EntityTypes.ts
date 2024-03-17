// Define the interface for an entity
export interface Entity {
	_id: string | null
	parent_fk_id: string | null
}

// Define the state for entities
export interface EntityState {
	entities: Entity[]
	entity: Entity | null
	loading: boolean
	success?: {}
	error?: {}
}

// Define the actions that can be performed on entities
export type EntityAction = {
	type: string
	payload: Entity | string
}

// Define the type for the dispatcher function
export type DispatchType = (args: EntityAction) => EntityAction

// Define initial action state
export const initialState: EntityState = {
	entities: [],
	entity: null,
	loading: false,
	success: {},
	error: {},
}
