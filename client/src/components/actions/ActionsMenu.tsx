import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import React, { FC, MouseEvent, useState } from 'react'
import translations from '../../i18n/locales'

const buttonTranslations = translations.common.buttons

const ActionsMenu: FC<{ onView: () => void; onEdit: () => void; onDelete: () => void }> = ({
	onView,
	onEdit,
	onDelete,
}) => {
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
				<MenuItem onClick={onView}>{buttonTranslations.view}</MenuItem>
				<MenuItem onClick={onEdit}>{buttonTranslations.edit}</MenuItem>
				<MenuItem onClick={onDelete}>{buttonTranslations.delete}</MenuItem>
			</Menu>
		</>
	)
}

export default ActionsMenu
