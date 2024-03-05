import React, { ReactNode, useState, useEffect, FC, useContext } from 'react'
import { Box, Typography, alpha, useTheme, Theme, Grid, Divider } from '@mui/material'
import { HeaderContext } from '../../contexts/HeaderContext'

interface HeaderProps {
	user: { name: string; role: string }
}

const Header: FC<HeaderProps> = ({ user }) => {
	const { headerData } = useContext(HeaderContext)
	console.log('Header Data (Header):', headerData)
	const theme = useTheme()

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
		return (
			<>
				<Typography variant='h4' color={'primary'}>
					{headerData.header}
				</Typography>
				<Typography variant='subtitle1' color={'secondary'}>
					{headerData.subheader}
				</Typography>
			</>
		)
	}

	const UserInfo = () => {
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant='body1' mr={1}>
					{user.name}
				</Typography>
				<Typography variant='body1' color={'primary'} mr={1}>
					|
				</Typography>
				<Typography variant='body2'>{user.role}</Typography>
			</div>
		)
	}

	const DateTime = () => {
		return <Typography variant='subtitle2'>{currentDateTime}</Typography>
	}

	interface ContentBoxProps {
		theme: Theme
		children: ReactNode
	}

	const ContentBox: FC<ContentBoxProps> = ({ theme, children }) => {
		return (
			<Box
				mb={2}
				boxShadow={2}
				sx={{
					px: 3,
					pt: 2,
					pb: 1,
					borderRadius: 2,
					height: '100%',
					backgroundColor: alpha(theme.palette.secondary.main, 0.2),
				}}>
				{children}
			</Box>
		)
	}

	return (
		<Box display='flex' flexDirection='column' px={4} pb={2} pt={4}>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<Box mb={1}>
						<Headers />
					</Box>
					<Box mb={0}>
						<UserInfo />
					</Box>
					<Box mb={1}>
						<DateTime />
					</Box>
				</Grid>
				<Grid item xs={4}>
					<ContentBox theme={theme}>{headerData.extraContent}</ContentBox>
				</Grid>
			</Grid>
			<Divider sx={{ mt: 2, mb: 1 }} />
		</Box>
	)
}

export default Header
