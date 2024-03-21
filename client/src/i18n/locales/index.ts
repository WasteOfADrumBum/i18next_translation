// Components
import common from './common/common.json'
// Errors
import errors from './errors/errors.json'
// Pages
import about from './pages/about.json'
import contact from './pages/contact.json'
import events from './pages/events.json'
import home from './pages/home.json'
import user from './pages/user.json'

/*
 * This file is used to import all the translations from the different files and export them as a single object.
 * This is useful to import all the translations in a single import statement.
 * To use the translations in a component, you can import the translations from this file and use them as needed.
 * For example, to use the translations for the about page, you can import the translations from this file and use them as translations.pages.about.
 */

const translations = {
	common,
	errors,
	pages: {
		about,
		contact,
		events,
		home,
		user,
	},
}

export default translations
