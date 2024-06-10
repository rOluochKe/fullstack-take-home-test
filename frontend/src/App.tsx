import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import HomePage from './pages/HomePage';
import ReadingListPage from './pages/ReadingListPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading-list" element={<ReadingListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
