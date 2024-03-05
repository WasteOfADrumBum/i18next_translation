import React, { FC } from 'react'
import { Container, Typography } from '@mui/material'

const NotFound: FC = () => {
	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				404 Not Found
			</Typography>
			<Typography variant='body1' gutterBottom>
				The page you are looking for does not exist.
			</Typography>
		</Container>
	)
}

export default NotFound
