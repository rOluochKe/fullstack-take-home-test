import { FC } from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Book } from '../types/Types';
import ReusableButton from './ReusableButton';

interface BookCardProps {
  book: Book;
  onAddToReadingList?: (book: Book) => void;
  onRemoveFromReadingList?: (book: Book) => void;
}

const BookCard: FC<BookCardProps> = ({
  book,
  onAddToReadingList,
  onRemoveFromReadingList,
}) => {
  const handleAddToReadingList = () => {
    if (onAddToReadingList) {
      onAddToReadingList(book);
    }
  };

  const handleRemoveFromReadingList = () => {
    if (onRemoveFromReadingList) {
      onRemoveFromReadingList(book);
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardMedia
        component="img"
        height="200px"
        image={book.coverPhotoURL}
        alt={book.title}
      />
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          {book.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" color="text.secondary">
            Author: {book.author}
          </Typography>
          <Typography variant="subtitle2" color="primary">
            Reading Level: {book.readingLevel}
          </Typography>
        </Box>
        {(onAddToReadingList ?? onRemoveFromReadingList) && (
          <>
            {onAddToReadingList && (
              <ReusableButton
                variant="contained"
                color="primary"
                onClick={handleAddToReadingList}
                sx={{ mt: 1 }}
              >
                Add to Reading List
              </ReusableButton>
            )}
            {onRemoveFromReadingList && (
              <ReusableButton
                variant="contained"
                color="secondary"
                onClick={handleRemoveFromReadingList}
                sx={{ mt: 1, ml: onAddToReadingList ? 1 : 0 }}
              >
                Remove from Reading List
              </ReusableButton>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
