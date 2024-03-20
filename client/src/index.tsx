import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import translations from './i18n/locales'
import store from './store'
import './styles/global.css'

const errorTranslations = translations.errors

const rootElement = document.getElementById('root')
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>,
	)
} else {
	throw new Error(errorTranslations.rootElementNotFound)
}
