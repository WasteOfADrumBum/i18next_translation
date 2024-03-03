import React from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'

const ActionsMenu: React.FC<{ onView: () => void; onEdit: () => void; onDelete: () => void }> = ({
	onView,
	onEdit,
	onDelete,
}) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
				<MenuItem onClick={onView}>View</MenuItem>
				<MenuItem onClick={onEdit}>Edit</MenuItem>
				<MenuItem onClick={onDelete}>Delete</MenuItem>
			</Menu>
		</>
	)
}

export default ActionsMenu
