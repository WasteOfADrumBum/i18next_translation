import { AppBar, Toolbar, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Footer: FC = () => {
	const { t } = useTranslation()
	return (
		<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0, width: '100%' }}>
			<Toolbar style={{ justifyContent: 'center' }}>
				<Typography variant='body2' color='inherit'>
					© {new Date().getFullYear()} {t('common.footer.content')} - {t('common.footer.allRightsReserved')}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Footer
