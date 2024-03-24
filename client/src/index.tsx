import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import App from './App'
import { HeaderContextProvider, ThemeContextProvider } from './contexts'
import i18n from './i18n/i18n'
import store from './store'
import './styles/global.css'

const rootElement = document.getElementById('root')

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<Provider store={store}>
				<I18nextProvider i18n={i18n}>
					<ThemeContextProvider>
						<HeaderContextProvider>
							<App />
						</HeaderContextProvider>
					</ThemeContextProvider>
				</I18nextProvider>
			</Provider>
		</StrictMode>,
	)
} else {
	throw new Error('Error: no root element found.')
}
