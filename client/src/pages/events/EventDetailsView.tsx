import React, { useContext, useEffect } from 'react'
import { HeaderContext } from '../../App'

const EventDetailsView: React.FC = () => {
	const { setHeaderData } = useContext(HeaderContext)

	useEffect(() => {
		// Update header data when component mounts
		setHeaderData({
			header: 'Event Details',
			subheader: 'Details for your primary event record',
			extraContent: () => <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
		})

		// Clean up header data when component unmounts
		return () => {
			setHeaderData({
				header: 'React MUI Template', // Default header
				subheader: 'A template for building React applications with Material-UI', // Default subheader
				extraContent: null, // No extra content
			})
		}
	}, [setHeaderData])

	return <div>{/* Code for Event Details View */}</div>
}

export default EventDetailsView
