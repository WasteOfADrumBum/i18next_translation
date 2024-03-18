import { Grid } from '@mui/material'
import { HeaderContext } from '../../contexts/HeaderContext'
import React, { FC, useContext, useEffect } from 'react'

const EntityListView: FC = () => {
	const { setHeaderData } = useContext(HeaderContext)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Entities',
			subheader: 'Entities associated with your primary event record',
			extraContent: <Grid container spacing={1}></Grid>,
			returnButton: true,
			returnPath: 'dashboard',
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
				returnButton: false, // No return button
			})
		}
	}, [setHeaderData])

	return <>Entity List</>
}

export default EntityListView
