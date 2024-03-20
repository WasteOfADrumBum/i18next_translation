import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { FC } from 'react'

const Footer: FC = () => {
	return (
		<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0, width: '100%' }}>
			<Toolbar style={{ justifyContent: 'center' }}>
				<Typography variant='body2' color='inherit'>
					© {new Date().getFullYear()} i18n MERN Stack with TypeScript and Redux - All Rights Reserved
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Footer
