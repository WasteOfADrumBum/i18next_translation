import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

interface HeaderData {
	header: string
	subheader: string
	tagging?: React.ReactNode | null
	extraContent?: React.ReactNode | null
	returnButton?: boolean
	returnPath?: string
}

interface HeaderContextValue {
	headerData: HeaderData
	setHeaderData: Dispatch<SetStateAction<HeaderData>>
}

const initialHeaderData: HeaderData = {
	header: '',
	subheader: '',
	tagging: null,
	extraContent: null,
	returnButton: false,
	returnPath: '/',
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

	return <HeaderContext.Provider value={{ headerData, setHeaderData }}>{children}</HeaderContext.Provider>
}
