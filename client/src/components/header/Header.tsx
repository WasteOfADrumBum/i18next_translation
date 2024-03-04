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

	return (
		<Box>
			<Box mb={2}>
				<Typography variant='h4'>{header}</Typography>
				<Typography variant='body1'>{subHeader}</Typography>
			</Box>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
				<Box>
					{/* TODO: <Typography variant='body1'>User: {user.name}</Typography> */}
					<Typography variant='body1'>User: John M. Doe</Typography>
					<Typography variant='body1'>{getCurrentDateTime()}</Typography>
				</Box>
			</Box>
			<Box>{children}</Box>
		</Box>
	)
}

export default Header
