import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, alpha } from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material';
import React, { ChangeEvent, FC, ReactNode } from 'react'

/*
 * Connect your component to Redux using connect or useSelector and useDispatch.
 * Pass Redux state as props to the DynamicDataTable component.
 * Define action dispatchers to handle page change and rows per page change.
 * Dispatch actions when page or rows per page changes.

 * Example:
 * const data = useSelector((state: RootState) => state.data)
 * const columns = useSelector((state: RootState) => state.columns)
 * const rowsPerPageOptions = useSelector((state: RootState) => state.rowsPerPageOptions)
 * const pagination = useSelector((state: RootState) => state.pagination)
 * const page = useSelector((state: RootState) => state.page)
 * const dispatch = useDispatch()
 *
 * <DynamicDataTable
 *  data={data}
 *  columns={columns}
 *  rowsPerPageOptions={rowsPerPageOptions}
 *  pagination={pagination}
 *  page={page}
 *  onPageChange={handlePageChange}
 *  onRowsPerPageChange={handleRowsPerPageChange}
 * />
 */

interface Column<T> {
    id: string
    label: string
    render?: (rowData: T) => ReactNode
}

interface Pagination {
    rowsPerPage: number
}

interface DynamicDataTableProps<T> {
    data: T[]
    columns: Column<T>[]
    rowsPerPageOptions: number[]
    pagination?: Pagination
    page: number
    onPageChange: (newPage: number) => void
    onRowsPerPageChange: (newRowsPerPage: number) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DynamicDataTable: FC<DynamicDataTableProps<any>> = ({
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

    const NoDataMessage = () => {
        return (
            <Container maxWidth='xl'>
                <Box mb={2}
                    boxShadow={2}
                    bgcolor={(theme) => alpha(theme.palette.secondary.main, 0.2)}
                    px={3}
                    pt={2}
                    pb={1}
                    sx={{
                        borderRadius: 2,
                        height: '100%',
                        minHeight: '250px',
											display: 'flex',
												flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
							<Typography variant='h6'>No data available</Typography>
										<Box ml={2}>
                    <IconButton color="primary" aria-label="refresh data" onClick={handleRefreshData}>
                        <RefreshIcon />
								</IconButton>
								</Box>
                </Box>
            </Container>
        );
    }

    const handleRefreshData = () => {
        // Add logic here to refresh the data
    }

    if (data.length === 0) {
        return <NoDataMessage />
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