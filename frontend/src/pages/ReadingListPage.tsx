import { FC } from 'react';
import { Typography, Box } from '@mui/material';

const Home: FC = () => {
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
        Reading List
      </Typography>
    </Box>
  );
};

export default Home;
