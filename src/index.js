import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BLUE, ORANGE } from './config';
import { AuthProvider } from './contexts/AuthContext';

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
  <AuthProvider initialLoggedInUser="">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root'),
);
