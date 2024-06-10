import { FC, useEffect, useState } from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notification from '../components/Notification';
import Pagination from '../components/Pagination';
import { useReadingListStore } from '../store';
import { Book } from '../types/Types';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import useMediaQueryComponent from '../hooks/UseMediaQuery';

const ReadingListPage: FC = () => {
  const [notification, setNotification] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { readingList, removeBook, setReadingList } = useReadingListStore();
  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    const storedReadingList = JSON.parse(
      localStorage.getItem('readingList') ?? '[]'
    ) as Book[];
    setReadingList(storedReadingList);
  }, [setReadingList]);

  const removeFromReadingList = (book: Book) => {
    removeBook(book.title);
    setNotification(
      `Book "${book.title}" has been removed from the reading list.`
    );
  };

  const handleNotificationClose = () => {
    setNotification('');
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const displayedResults = readingList.slice(0, currentPage * itemsPerPage);
  const { isLargeScreen, isMediumScreen } = useMediaQueryComponent();

  return (
    <>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        sx={{ marginBottom: '15px' }}
      >
        <IconButton color="primary" onClick={() => navigate('/')}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <Typography
          variant="body1"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Return to search
        </Typography>
      </Grid>
      <Typography
        variant="h3"
        sx={{ marginBottom: '20px', textAlign: 'center' }}
      >
        Reading List
      </Typography>
      {readingList.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: 'center', marginTop: '20px' }}
        >
          Your reading list is empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {displayedResults.map((book: Book, index) => (
              <Grid
                key={index}
                item
                xs={isLargeScreen ? 4 : isMediumScreen ? 6 : 12}
              >
                <BookCard
                  book={book}
                  onRemoveFromReadingList={removeFromReadingList}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            currentPage={currentPage}
            totalItems={readingList.length}
            itemsPerPage={itemsPerPage}
            onLoadMore={handleLoadMore}
          />
        </>
      )}
      {notification && (
        <Notification
          message={notification}
          onClose={handleNotificationClose}
        />
      )}
    </>
  );
};

export default ReadingListPage;
