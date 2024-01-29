import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#262254"//'#556cd6',
    },
    secondary: {
      main: "#543884"//'#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

