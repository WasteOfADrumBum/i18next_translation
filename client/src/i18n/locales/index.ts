import commonEn from './en/common/common.json'
import errorsEn from './en/errors/errors.json'
import aboutEn from './en/pages/about.json'
import contactEn from './en/pages/contact.json'
import entitiesEn from './en/pages/entities.json'
import eventsEn from './en/pages/events.json'
import homeEn from './en/pages/home.json'
import userEn from './en/pages/user.json'
import vehiclesEn from './en/pages/vehicles.json'
import commonEs from './es/common/common.json'
import errorsEs from './es/errors/errors.json'
import aboutEs from './es/pages/about.json'
import contactEs from './es/pages/contact.json'
import entitiesEs from './es/pages/entities.json'
import eventsEs from './es/pages/events.json'
import homeEs from './es/pages/home.json'
import userEs from './es/pages/user.json'
import vehiclesEs from './es/pages/vehicles.json'

const enTranslation = {
	common: commonEn,
	errors: errorsEn,
	pages: {
		about: aboutEn,
		contact: contactEn,
		entities: entitiesEn,
		events: eventsEn,
		home: homeEn,
		user: userEn,
		vehicles: vehiclesEn,
	},
}

const esTranslation = {
	common: commonEs,
	errors: errorsEs,
	pages: {
		about: aboutEs,
		contact: contactEs,
		entities: entitiesEs,
		events: eventsEs,
		home: homeEs,
		user: userEs,
		vehicles: vehiclesEs,
	},
}

export { enTranslation, esTranslation }
