import React, { FC, ReactNode, ChangeEvent } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material'

interface RowData {
	[key: string]: any // Define a structure for row data if possible
}

interface Column<RowDataType> {
	id: string
	label: string
	render?: (rowData: RowDataType) => ReactNode
}

interface Pagination {
	rowsPerPage: number
}

interface DynamicDataTableProps<RowDataType extends Record<string, any>> {
	data: RowDataType[]
	columns: Column<RowDataType>[]
	rowsPerPageOptions: number[]
	pagination?: Pagination
	page: number
	onPageChange: (newPage: number) => void
	onRowsPerPageChange: (newRowsPerPage: number) => void
}

const DynamicDataTable: FC<DynamicDataTableProps<RowData>> = ({
	data,
	columns,
	rowsPerPageOptions,
	pagination,
	page,
	onPageChange,
	onRowsPerPageChange,
}) => {
	const handleChangePage = (event: unknown, newPage: number) => {
		onPageChange(newPage)
	}

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		onRowsPerPageChange(parseInt(event.target.value, 10))
		onPageChange(0)
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.id}>{column.label}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						.slice(
							page * (pagination?.rowsPerPage || 1),
							page * (pagination?.rowsPerPage || 1) + (pagination?.rowsPerPage || 1),
						)
						.map((row, index) => {
							return (
								<TableRow key={index}>
									{columns.map((column) => (
										<TableCell key={column.id}>{column.render ? column.render(row) : row[column.id]}</TableCell>
									))}
								</TableRow>
							)
						})}
				</TableBody>
			</Table>
			{pagination && (
				<TablePagination
					rowsPerPageOptions={rowsPerPageOptions}
					component='div'
					count={data.length}
					rowsPerPage={pagination.rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</TableContainer>
	)
}

export default DynamicDataTable
