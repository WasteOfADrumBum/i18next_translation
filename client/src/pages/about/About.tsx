// About.tsx
import React from 'react'
import { Container, Typography } from '@mui/material'

const About: React.FC = () => {
	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				About Us
			</Typography>
			<Typography variant='body1' gutterBottom>
				This is the about page of our application.
			</Typography>
			<Typography variant='body1'>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante eget nunc egestas euismod sit amet non sem.
				Mauris auctor, est eu dignissim suscipit, nulla risus placerat lacus, nec facilisis erat dolor non tellus. Proin
				tempor urna vitae magna malesuada ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
				posuere cubilia Curae; Aliquam erat volutpat.
			</Typography>
		</Container>
	)
}

export default About
