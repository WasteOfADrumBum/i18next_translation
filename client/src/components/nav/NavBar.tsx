import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	FormControlLabel,
	FormGroup,
	IconButton,
	Menu,
	MenuItem,
	Select,
	SelectChangeEvent,
	Switch,
	Toolbar,
	Typography,
} from '@mui/material'
import React, { FC, MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ThemeSwitcher } from '../../components'
import translations from '../../i18n/locales'
import { useAuth } from '../../pages'

interface NavBarProps {
	onLoginToggle: (newState: boolean) => void
	darkMode: boolean
	toggleDarkMode: () => void
	changeLanguage?: (lng: string) => void
}

const NavBar: FC<NavBarProps> = ({ onLoginToggle, darkMode, toggleDarkMode }) => {
	const { t, i18n } = useTranslation()
	const { isAuthenticated } = useAuth()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const [loginState, setLoginState] = useState<boolean>(isAuthenticated)
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

	const handleLanguageChange = (event: SelectChangeEvent<string>) => {
		const newLanguage = event.target.value as string
		setSelectedLanguage(newLanguage)
		i18n.changeLanguage(newLanguage)
	}

	useEffect(() => {
		// Update loginState when isAuthenticated changes
		setLoginState(isAuthenticated)
	}, [isAuthenticated])

	const handleMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLoginToggle = () => {
		const newLoginState = !loginState
		setLoginState(newLoginState)
		onLoginToggle(newLoginState)
	}

	return (
		<AppBar position='fixed'>
			<Toolbar>
				<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }} onClick={handleMenu}>
					<MenuIcon />
				</IconButton>
				<Menu
					id='menu-appbar'
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={open}
					onClose={handleClose}>
					{loginState && (
						<MenuItem onClick={handleClose} component={Link} to='/dashboard'>
							Dashboard
						</MenuItem>
					)}
					{!loginState && (
						<span>
							<MenuItem onClick={handleClose} component={Link} to='/'>
								Home
							</MenuItem>
							<MenuItem onClick={handleClose} component={Link} to='/login'>
								Login
							</MenuItem>
						</span>
					)}
				</Menu>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					Event Management System
				</Typography>
				<FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<FormControlLabel
						sx={{ mr: 5 }}
						control={<Switch checked={loginState} onChange={handleLoginToggle} aria-label='login switch' />}
						label={loginState ? 'Logout' : 'Login'}
					/>
					<ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
				</FormGroup>
				<Select value={selectedLanguage} label='' onChange={handleLanguageChange} sx={{ marginX: 1 }}>
					<MenuItem value='en'>{t(translations.languages.english)}</MenuItem>
					<MenuItem value='es'>{t(translations.languages.spanish)}</MenuItem>
					<MenuItem value='fr'>{t(translations.languages.french)}</MenuItem>
					<MenuItem value='de'>{t(translations.languages.german)}</MenuItem>
					<MenuItem value='ja'>{t(translations.languages.japanese)}</MenuItem>
					<MenuItem value='zh'>{t(translations.languages.chinese)}</MenuItem>
				</Select>
				{isAuthenticated && (
					<div>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'>
							<AccountCircleIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}>
							<MenuItem onClick={handleClose}>Profile</MenuItem>
							<MenuItem onClick={handleClose}>My account</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
