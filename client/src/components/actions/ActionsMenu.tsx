import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { FC, MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const ActionsMenu: FC<{ onView: () => void; onEdit: () => void; onDelete: () => void }> = ({
	onView,
	onEdit,
	onDelete,
}) => {
	const { t } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton aria-controls='actions-menu' aria-haspopup='true' onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu id='actions-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={onView}>{t('common.buttons.view')}</MenuItem>
				<MenuItem onClick={onEdit}>{t('common.buttons.edit')}</MenuItem>
				<MenuItem onClick={onDelete}>{t('common.buttons.delete')}</MenuItem>
			</Menu>
		</>
	)
}

export default ActionsMenu
