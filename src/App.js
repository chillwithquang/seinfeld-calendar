import { Redirect, Route, Switch } from 'react-router-dom';
import { LOGIN_URL, SIGNUP_URL } from './config/config';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={LOGIN_URL} />
      </Route>
      <Route exact path={LOGIN_URL}>
        <Login />
      </Route>
      <Route path={SIGNUP_URL}>
        <SignUp />
      </Route>
    </Switch>
  );
}

export default App;
