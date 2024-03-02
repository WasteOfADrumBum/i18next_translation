import buttons from './components/buttons.json'
import about from './pages/about.json'
import contact from './pages/contact.json'
import dashboard from './pages/dashboard.json'
import home from './pages/home.json'
import user from './pages/user.json'

/*
 * This file is used to import all the translations from the different files and export them as a single object.
 * This is useful to import all the translations in a single import statement.
 * To use the translations in a component, you can import the translations from this file and use them as needed.
 * For example, to use the translations for the about page, you can import the translations from this file and use them as translations.pages.about.
 */

const translations = {
	buttons,
	pages: {
		about,
		contact,
		dashboard,
		home,
		user,
	},
}

export default translations
