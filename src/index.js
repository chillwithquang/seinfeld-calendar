import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import { BLUE, ORANGE } from './config';

const theme = createMuiTheme({
  typography: {
    fontFamily:
      " -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: `${ORANGE}`,
    },
    secondary: {
      main: `${BLUE}`,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
