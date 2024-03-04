import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Box, Typography } from '@mui/material'

interface HeaderProps {
	header: string
	subHeader: string
	children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ header, subHeader, children }) => {
	const user = useSelector((state: RootState) => state.user) // TODO: have user state in Redux store

	const getCurrentDateTime = () => {
		const currentDate = new Date()
		return currentDate.toLocaleString()
	}

	const Headers = () => {
		return (
			<Box>
				<Typography variant='h4'>{header}</Typography>
				<Typography variant='h6'>{subHeader}</Typography>
			</Box>
		)
	}

	const UserInfo = () => {
		return (
			<Box>
				<Typography variant='h6'>User: User Name Here</Typography>
				<Typography variant='h6'>Role: User Role Here</Typography>
			</Box>
		)
	}

	const DateTime = () => {
		return (
			<Box>
				<Typography variant='h6'>Date/Time: {getCurrentDateTime()}</Typography>
			</Box>
		)
	}

	const ContentBox = ({ children }: { children: ReactNode }) => {
		return (
			<Box p={2} boxShadow={2}>
				{children}
			</Box>
		)
	}

	return (
		<Box display='flex' flexDirection='row'>
			<Box flex='8'>
				<Box mb={2}>
					<Headers />
				</Box>
				<Box mb={2}>
					<UserInfo />
				</Box>
				<Box mb={2}>
					<DateTime />
				</Box>
			</Box>
			<Box flex='4'>
				<ContentBox>{children}</ContentBox>
			</Box>
		</Box>
	)
}

export default Header
