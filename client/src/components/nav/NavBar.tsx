import { AnalyticsOutlined, DashboardOutlined, HomeOutlined, LoginOutlined } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	FormControlLabel,
	FormGroup,
	IconButton,
	Menu,
	MenuItem,
	Switch,
	Toolbar,
	Typography,
} from '@mui/material'
import React, { FC, MouseEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageSwticher, ThemeSwitcher } from '../../components'
import { ThemeContext } from '../../contexts'
import { useAuth } from '../../pages'

interface NavBarProps {
	onLoginToggle: (newState: boolean) => void
}

const NavBar: FC<NavBarProps> = ({ onLoginToggle }) => {
	const { t } = useTranslation()
	const { isAuthenticated } = useAuth()
	const { darkMode, setDarkMode } = useContext(ThemeContext)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const [loginState, setLoginState] = useState<boolean>(isAuthenticated)

	useEffect(() => {
		// TODO: Update loginState when isAuthenticated changes
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

	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode) // Toggle dark mode using context
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
						<span>
							<MenuItem onClick={handleClose} component={Link} to='/dashboard'>
								<DashboardOutlined sx={{ marginRight: 1 }} color='primary' />
								{t('common.dashboard.dashboard')}
							</MenuItem>
							<MenuItem onClick={handleClose} component={Link} to='/analytics'>
								<AnalyticsOutlined sx={{ marginRight: 1 }} color='primary' />
								Event Analytics {/* TODO: Add Translation */}
							</MenuItem>
						</span>
					)}
					{!loginState && (
						<span>
							<MenuItem onClick={handleClose} component={Link} to='/'>
								<HomeOutlined sx={{ marginRight: 1 }} color='primary' />
								{t('pages.home.pageTitle')}
							</MenuItem>
							<MenuItem onClick={handleClose} component={Link} to='/login'>
								<LoginOutlined sx={{ marginRight: 1 }} color='primary' />
								{t('common.buttons.login')}
							</MenuItem>
						</span>
					)}
				</Menu>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					{t('common.app.name')}
				</Typography>
				<FormGroup sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<FormControlLabel
						sx={{ mr: 5 }}
						control={<Switch checked={loginState} onChange={handleLoginToggle} aria-label='login switch' />}
						label={loginState ? t('common.buttons.logout') : t('common.buttons.login')}
					/>
					<ThemeSwitcher darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
				</FormGroup>
				<LanguageSwticher />
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
