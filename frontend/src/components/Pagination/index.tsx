import { Box, Pagination } from '@mui/material'

export const AppPagination = ({ count, onPageChange }) => {
  const pageSize = 32

  return (
    <Box justifyContent={'center'} alignItems={'center'} display={'flex'}
      sx={{
        margin: "20px 0px"
      }}>
      <Pagination
        count={Math.ceil(parseInt(count) / Number(pageSize))}
        onChange={onPageChange}
      />
    </Box>
  )
}
