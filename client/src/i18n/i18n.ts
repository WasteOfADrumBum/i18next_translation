import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import { deTranslation, enTranslation, esTranslation, frTranslation, jaTranslation, zhTranslation } from './locales'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		es: {
			translation: esTranslation,
		},
		de: {
			translation: deTranslation,
		},
		fr: {
			translation: frTranslation,
		},
		ja: {
			translation: jaTranslation,
		},
		zh: {
			translation: zhTranslation,
		},
	},
	fallbackLng: 'en', // Fallback language
	debug: true, // Enable debug mode
	interpolation: {
		escapeValue: false, // React already protects from XSS
	},
})

export default i18n
