import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Mulish, sans-serif',
    h3: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: '#5ACCCC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FABD33',
    },
    text: {
      primary: '#335C6E',
    },
  },
});

export default theme;
