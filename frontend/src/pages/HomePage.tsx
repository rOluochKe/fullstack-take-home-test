import { FC, useState, useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import Pagination from '../components/Pagination';
import ReusableButton from '../components/ReusableButton';
import SearchBar from '../components/SearchBar';
import { Book } from '../types/Types';
import { GET_BOOKS } from '../queries';
import useMediaQueryComponent from '../hooks/UseMediaQuery';
import { useReadingListStore } from '../store';

const Home: FC = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [notification, setNotification] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data } = useQuery<{ books: Book[] }>(GET_BOOKS);
  const { readingList, addBook, setReadingList } = useReadingListStore();

  const itemsPerPage = 12;

  const { isLargeScreen, isMediumScreen } = useMediaQueryComponent();

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  useEffect(() => {
    const storedReadingList = localStorage.getItem('readingList');
    if (storedReadingList) {
      setReadingList(JSON.parse(storedReadingList));
    }
  }, [setReadingList]);

  const handleSearch = (query: string) => {
    if (data && data.books) {
      const filteredResults = data.books.filter((book: Book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  const handleAddToReadingList = (book: Book) => {
    const exists = readingList.some((item) => item.title.toLowerCase() === book.title.toLowerCase());

    if (exists) {
      setNotification(`Book "${book.title}" already exists in the reading list.`);
    } else {
      addBook(book);
      localStorage.setItem('readingList', JSON.stringify([...readingList, book]));
      setNotification(`Book "${book.title}" has been added to the reading list.`);
    }
  };

  const handleNotificationClose = () => {
    setNotification('');
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const displayedResults = searchResults.slice(0, currentPage * itemsPerPage);

  return (
    <>
      <Typography variant="h3" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Book Management System
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ReusableButton
          component={Link}
          to="/reading-list"
          variant="contained"
          color="primary"
        >
          My reading list
        </ReusableButton>
      </Box>
      <SearchBar
        onSearch={handleSearch}
        suggestions={searchResults}
        onAddToReadingList={handleAddToReadingList}
      />
      {loading && <Loader />}
      {error && <Typography>Error: {error.message}</Typography>}
      {notification && (
        <Notification message={notification} onClose={handleNotificationClose} />
      )}
      <Grid container spacing={2}>
        {displayedResults.map((book: Book, index) => (
          <Grid key={index} item xs={isLargeScreen ? 4 : isMediumScreen ? 6 : 12}>
            <BookCard book={book} onAddToReadingList={handleAddToReadingList} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        currentPage={currentPage}
        totalItems={searchResults.length}
        itemsPerPage={itemsPerPage}
        onLoadMore={handleLoadMore}
      />
    </>
  );
};

export default Home;
