// HeaderContext.tsx
import React, { createContext, FC, useState, Dispatch, SetStateAction, ReactNode } from 'react'

interface HeaderData {
	header: string
	subheader: string
	extraContent: React.ReactNode | null
}

interface HeaderContextValue {
	headerData: HeaderData
	setHeaderData: Dispatch<SetStateAction<HeaderData>>
}

const initialHeaderData: HeaderData = {
	header: 'React MUI Template',
	subheader: 'A template for building React applications with Material-UI',
	extraContent: null,
}

export const HeaderContext = createContext<HeaderContextValue>({
	headerData: initialHeaderData,
	setHeaderData: () => {
		throw new Error('setHeaderData must be overridden')
	},
})

interface HeaderContextProviderProps {
	children: ReactNode
}

export const HeaderContextProvider: FC<HeaderContextProviderProps> = ({ children }) => {
	const [headerData, setHeaderData] = useState<HeaderData>(initialHeaderData)
	console.log('Header Data Provider:', headerData) // Log the headerData here

	return <HeaderContext.Provider value={{ headerData, setHeaderData }}>{children}</HeaderContext.Provider>
}
