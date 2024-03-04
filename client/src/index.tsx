import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './styles/global.css'
import translations from './i18n/locales'

const errorTranslations = translations.errors

const rootElement = document.getElementById('root')
if (rootElement) {
	createRoot(rootElement).render(
		<React.StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</React.StrictMode>,
	)
} else {
	throw new Error(errorTranslations.rootElementNotFound)
}
