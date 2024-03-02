import React from 'react'
import { Typography, AppBar, Toolbar } from '@mui/material'

const Footer: React.FC = () => {
	return (
		<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0, width: '100%' }}>
			<Toolbar style={{ justifyContent: 'center' }}>
				<Typography variant='body2' color='inherit'>
					© {new Date().getFullYear()} i18m MERN Stack with TypeScript and Redux - All Rights Reserved
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Footer
