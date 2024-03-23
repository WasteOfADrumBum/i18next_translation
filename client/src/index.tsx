import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import translations from './i18n/locales'
import store from './store'
import './styles/global.css'
import { GetLanguage } from './utils'

const errorTranslations = translations.errors[GetLanguage()]

i18n.use(Backend).init({
	fallbackLng: 'en',
	debug: true,
	resources: translations,
})

const rootElement = document.getElementById('root')

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<App />
				</I18nextProvider>
			</Provider>
		</StrictMode>,
	)
} else {
	throw new Error(errorTranslations.rootElementNotFound)
}
