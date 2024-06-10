import { FC } from 'react';
import { Box } from '@mui/material';
import ReusableButton from './ReusableButton';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onLoadMore: () => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onLoadMore,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      {currentPage < totalPages && (
        <ReusableButton
          variant="contained"
          color="primary"
          onClick={onLoadMore}
        >
          Load More
        </ReusableButton>
      )}
    </Box>
  );
};

export default Pagination;
