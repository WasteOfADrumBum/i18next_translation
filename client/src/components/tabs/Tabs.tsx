import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Menu, MenuItem, Tab } from '@mui/material'
import React, { Children, FC, isValidElement, ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'

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
	basePath: string
}

const TabsComponent: FC<TabsComponentProps> = ({ isAuthenticated, tabs, children, basePath }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [value, setValue] = useState<string>(`${tabs[0].route}`)
	const { eventId } = useParams()

	if (!isAuthenticated) return null

	useEffect(() => {
		if (eventId) {
			// if location.pathname as nothing after the eventId, navigate to the first tab
			if (location.pathname === `${basePath}${eventId}`) {
				navigate(`${basePath}${eventId}${tabs[0].route}`)
			} else {
				navigate(location.pathname)
			}
		}
	}, [eventId, basePath, navigate])

	const handleChange = (_event: SyntheticEvent, newValue: string) => {
		setValue(newValue)
		navigate(`${basePath}${eventId}${newValue}`)
	}

	const renderDropdownMenu = (options: { label: string; route: string; element: ReactNode }[]) => {
		return (
			<Menu open={false}>
				{options.map((option, index) => (
					<MenuItem key={index} onClick={() => navigate(`${basePath}${eventId}${option.route}`)}>
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
