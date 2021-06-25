import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { HOME_URL, LOGIN_URL, SIGNUP_URL } from './config';
import { HabitProvider } from './contexts/HabitContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider initialLoggedInUser="">
        <HabitProvider>
          <CssBaseline />
          <Typography
            component="div"
            style={{
              backgroundColor: '#fff',
              height: '10vh',
            }}
          >
            <Header />
          </Typography>

          <Typography
            component="div"
            style={{
              backgroundColor: '#fff',
              height: '90vh',
            }}
          >
            <Switch>
              <Route exact path={HOME_URL}>
                <Home />
              </Route>
              <Route path={LOGIN_URL}>
                <Login />
              </Route>
              <Route path={SIGNUP_URL}>
                <SignUp />
              </Route>
            </Switch>
          </Typography>
        </HabitProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
