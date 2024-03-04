import React, { ReactNode, useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../store'
import { Box, Typography, alpha, useTheme } from '@mui/material'

interface HeaderProps {
	header: string
	subHeader: string
	children: ReactNode
}

const Header: React.FC<HeaderProps> = ({ header, subHeader, children }) => {
	const theme = useTheme()
	// TODO: have user state in Redux store
	// const user = useSelector((state: RootState) => state.user)

	// State to store current date and time
	const [currentDateTime, setCurrentDateTime] = useState<string>(getCurrentDateTime())

	useEffect(() => {
		// Function to update current date and time every second
		const interval = setInterval(() => {
			setCurrentDateTime(getCurrentDateTime())
		}, 1000)

		// Cleanup function to clear interval when component unmounts
		return () => clearInterval(interval)
	}, []) // Empty dependency array ensures effect runs only once on mount

	function getCurrentDateTime() {
		const currentDate = new Date()
		return currentDate.toLocaleString()
	}

	const Headers = () => {
		// TODO: make ternary operators for header error catch
		return (
			<>
				<Typography variant='h4'>{header}</Typography>
				<Typography variant='subtitle1' color={'secondary'}>
					{subHeader}
				</Typography>
			</>
		)
	}

	const UserInfo = () => {
		// TODO: make ternary operators for user error catch
		return (
			<>
				<Typography variant='body1'>User Name Here</Typography>
				<Typography variant='body2'>User Role Here</Typography>
			</>
		)
	}

	const DateTime = () => {
		return <Typography variant='subtitle2'>{currentDateTime}</Typography>
	}

	const ContentBox = ({ theme, children }: { theme: any; children: ReactNode }) => {
		return (
			<Box
				px={4}
				py={2}
				boxShadow={2}
				sx={{ borderRadius: 8, height: '100%', backgroundColor: alpha(theme.palette.secondary.main, 0.2) }}>
				{children}
			</Box>
		)
	}

	return (
		<Box display='flex' flexDirection='row' px={4} pb={2} pt={4}>
			<Box flex='8'>
				<Box mb={1}>
					<Headers />
				</Box>
				<Box mb={1}>
					<UserInfo />
				</Box>
				<Box mb={1}>
					<DateTime />
				</Box>
			</Box>
			<Box flex='4'>
				<ContentBox theme={theme}>{children}</ContentBox>
			</Box>
		</Box>
	)
}

export default Header
