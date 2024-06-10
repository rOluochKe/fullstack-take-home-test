import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ReusableButton from '../components/ReusableButton';

const NotFoundPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        404 - Not Found
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        The page you are looking for does not exist.
      </Typography>
      <ReusableButton
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px' }}
      >
        Go to Home Page
      </ReusableButton>
    </Box>
  );
};

export default NotFoundPage;
