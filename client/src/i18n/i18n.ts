import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import { enTranslation, esTranslation } from './locales'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		es: {
			translation: esTranslation,
		},
	},
	fallbackLng: 'en', // Fallback language
	debug: true, // Enable debug mode
	interpolation: {
		escapeValue: false, // React already protects from XSS
	},
})

export default i18n
