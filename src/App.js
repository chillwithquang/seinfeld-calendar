import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default App;
