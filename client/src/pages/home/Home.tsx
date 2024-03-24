import { Box, Button, Container, ThemeProvider, Typography } from '@mui/material'
import React, { FC, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts'
import { darkTheme, lightTheme } from '../../styles/theme'

const Home: FC = () => {
	const { t } = useTranslation()
	const darkMode = useContext(ThemeContext)
	const theme = darkMode ? darkTheme : lightTheme
	const navigate = useNavigate()

	const handleLoginClick = () => {
		navigate('/login')
	}

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='md'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						minHeight: 'calc(100vh - 128px)',
						marginTop: '2rem',
						marginBottom: '2rem',
					}}>
					<Typography variant='h1' component='h1' gutterBottom>
						{t('pages.home.header')}
					</Typography>
					<Typography variant='body1' component='p' gutterBottom>
						{t('pages.home.body.content')}
					</Typography>
					<Typography variant='body2' component='p' gutterBottom>
						{t('pages.home.body.content2')}
					</Typography>
					<Button variant='contained' color='primary' sx={{ mt: 4 }} onClick={handleLoginClick}>
						{t('common.buttons.login')}
					</Button>
				</Box>
			</Container>
		</ThemeProvider>
	)
}

export default Home
