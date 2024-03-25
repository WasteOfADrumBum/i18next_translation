import { Container, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const NotFound: FC = () => {
	const { t } = useTranslation()

	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				404 {t('errors.404.notFound')}
			</Typography>
			<Typography variant='body1' gutterBottom>
				{t('errors.404.message')}
			</Typography>
		</Container>
	)
}

export default NotFound
