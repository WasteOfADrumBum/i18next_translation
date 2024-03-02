import React from 'react'
import { HTMLAttributes } from 'react'
import { Typography } from '@mui/material'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	sx?: {
		[key: string]: string | number
	}
}

const Footer: React.FC<FooterProps> = ({ sx, ...rest }) => {
	return (
		<footer {...rest} style={sx}>
			<Typography variant='body2' color='inherit'>
				© {new Date().getFullYear()} i18m MERN Stack with TypeScript and Redux - All Rights Reserved
			</Typography>
		</footer>
	)
}

export default Footer
