import React, { useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { HOME_URL, LOGIN_URL, SIGNUP_URL } from './config';
import { HabitProvider } from './contexts/HabitContext';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { loggedInUser } = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path={SIGNUP_URL} component={SignUp} />
      <Route path={LOGIN_URL} component={Login} />
      <Redirect exact from={HOME_URL} to={LOGIN_URL} />
    </Switch>
  );

  if (loggedInUser !== '') {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
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
        {routes}
      </Typography>
    </HabitProvider>
  );
}

export default withRouter(App);
