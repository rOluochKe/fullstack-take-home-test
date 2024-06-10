import { FC, useState } from 'react';
import { TextField, Popper, Paper, List, ListItem, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Book, MediaQueryProps } from '../types/Types';
import useMediaQueryComponent from '../hooks/UseMediaQuery';
import ReusableButton from './ReusableButton';

interface SearchBarProps {
  onSearch: (query: string) => void;
  suggestions: Book[];
  onAddToReadingList: (book: Book) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, suggestions, onAddToReadingList }) => {
  const [query, setQuery] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popperVisible, setPopperVisible] = useState<boolean>(false);

  const { isSmallScreen, isMediumScreen, isLargeScreen }: MediaQueryProps = useMediaQueryComponent();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
    setAnchorEl(value ? event.currentTarget : null);
    setPopperVisible(!!value);
  };

  const getWidth = () => {
    if (isLargeScreen || isMediumScreen) return '60%';
    if (isSmallScreen) return '100%';
  };

  const getPaperWidth = () => {
    if (isLargeScreen) return '76%';
    if (isMediumScreen) return '95%';
    if (isSmallScreen) return '100%';
  };

  return (
    <form>
      <Box width={getWidth()} margin="auto" display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Search by Title"
          value={query}
          onChange={handleChange}
          variant="outlined"
          sx={{ marginBottom: '20px', width: '100%' }}
        />
        <Popper open={popperVisible} anchorEl={anchorEl} placement="bottom-start" style={{ zIndex: 9999, width: getWidth() }}>
          <Paper style={{ maxHeight: '300px', overflowY: 'auto', width: getPaperWidth(), display: 'flex', justifyContent: 'center' }}>
            {suggestions.length === 0 ? (
              <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
                No matching books found.
              </Typography>
            ) : (
              <List>
                {suggestions.map((book, index) => (
                  <ListItem key={index}>
                    <Card sx={{ display: 'flex', width: '100%' }}>
                      <CardMedia
                        component="img"
                        image={book.coverPhotoURL}
                        alt={book.title}
                        sx={{ width: '15%' }}
                      />
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h6" sx={{ fontSize: '1rem' }}>{book.title}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          Author: {book.author}
                        </Typography>
                        <ReusableButton
                          variant="contained"
                          color="primary"
                          onClick={() => onAddToReadingList(book)}
                          sx={{ marginTop: '10px', fontSize: '0.7rem' }}
                        >
                          Add to Reading List
                        </ReusableButton>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Popper>
      </Box>
    </form>
  );
};

export default SearchBar;
