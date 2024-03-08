import React, { useEffect, ReactNode, Children, SyntheticEvent, isValidElement, useState, FC } from 'react'
// @ts-ignore
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Box, Menu, MenuItem, Tab } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

/* 
	? How to use this component: 
	const tabs = [
			{ label: 'Tab Label', route: '/', element: <Cpomonent /> },
			{
					label: 'Dropdown Label',
					route: '/route', // You can set this to any route you want
					dropdown: true,
					options: [
							{ label: 'Option 1', route: '/option1', element: <Component1 /> }, 
							{ label: 'Option 2', route: '/option2', element: <Component2 /> }, 
					],
			},
	] 
*/

interface Tab {
	label: string
	route: string
	element: ReactNode
	dropdown?: boolean
	options?: { label: string; route: string; element: ReactNode }[]
}

interface TabsComponentProps {
	isAuthenticated: boolean
	tabs: Tab[]
	children: ReactNode
}

const TabsComponent: FC<TabsComponentProps> = ({ isAuthenticated, tabs, children }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [value, setValue] = useState('/')

	useEffect(() => {
		// Find the first tab whose route exactly matches the current location
		const matchedTab = tabs.find((tab) => `/dashboard${tab.route}` === location.pathname)
		// If a tab is matched and it's different from the current value, update the value
		if (matchedTab && matchedTab.route !== value) {
			setValue(matchedTab.route)
		} else if (!matchedTab && value !== '/') {
			// Reset the value if there's no matched tab
			setValue('/')
		}
	}, [location.pathname, tabs, value])

	// If the user is not authenticated, redirect to the login page
	if (!isAuthenticated) {
		return <Navigate to='/login' />
	}

	const handleChange = (_event: SyntheticEvent, newValue: string) => {
		setValue(newValue)
		// Navigate programmatically to the selected tab route
		navigate(`/dashboard${newValue}`)
	}

	// Render dropdown menu
	const renderDropdownMenu = (options: { label: string; route: string; element: ReactNode }[]) => {
		return (
			<Menu open={false}>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={() => navigate(option.route)}>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='tab list'>
						{tabs.map((tab, index) => {
							if (tab.dropdown) {
								return <Tab key={index} label={tab.label} value={renderDropdownMenu(tab.options || [])} />
							} else {
								return <Tab key={index} label={tab.label} value={tab.route} />
							}
						})}
					</TabList>
				</Box>
				<TabPanel value={value}>
					<Routes>
						{Children.map(children, (child, index) => {
							if (isValidElement(child)) {
								const { path, element } = child.props
								return <Route key={index} path={path} element={element} />
							}
							return null
						})}
					</Routes>
				</TabPanel>
			</TabContext>
		</Box>
	)
}

export default TabsComponent
