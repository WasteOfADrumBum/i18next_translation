import React, { createContext, FC, useContext, useState } from 'react'

type LanguageContextType = {
	language: string
	setLanguage: (lang: string) => void
}

// Create the context with initial values
const LanguageContext = createContext<LanguageContextType>({
	language: 'en',
	setLanguage: () => {
		/* Empty function body */
	},
})

// Create a provider component to wrap your application
export const LanguageContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<string>('en')

	const changeLanguage = (lang: string) => {
		setLanguage(lang)
	}

	return (
		<LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>{children}</LanguageContext.Provider>
	)
}

// Custom hook to easily access the language context
export const useLanguage = () => {
	const context = useContext<LanguageContextType>(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}
