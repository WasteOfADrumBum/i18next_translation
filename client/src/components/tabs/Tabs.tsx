import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Box, Tab } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

interface Tab {
	label: string
	route: string
	element: React.ReactNode
}

interface TabsComponentProps {
	isAuthenticated: boolean
	tabs: Tab[]
	children: React.ReactNode
}

const TabsComponent: React.FC<TabsComponentProps> = ({ isAuthenticated, tabs, children }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [value, setValue] = React.useState('/')

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

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
		// Navigate programmatically to the selected tab route
		navigate(`/dashboard${newValue}`)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label='tab list'>
						{tabs.map((tab, index) => (
							<Tab key={index} label={tab.label} value={tab.route} />
						))}
					</TabList>
				</Box>
				<TabPanel value={value}>
					<Routes>
						{React.Children.map(children, (child, index) => {
							if (React.isValidElement(child)) {
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
