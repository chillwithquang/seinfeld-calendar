import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME_URL, REQUEST_LOGIN_URL, SIGNUP_URL, BLUE_HOVER } from '../config';
import { postInfo } from '../services/AxiosServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 5),
  },
  submit: {
    '&:hover': {
      backgroundColor: `${BLUE_HOVER}`,
    },
    margin: theme.spacing(3, 0),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    name: '',
    password: '',
  });
  const [alert, setAlert] = useState({
    severity: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setLoggedInUser(state.name);
    if (state.name === '' || state.password === '') {
      setAlert({
        severity: 'error',
        message: 'Please enter your username and password!',
      });
    } else {
      setAlert({ severity: 'info', message: 'Verifying...Please wait' });
      setIsLoading(true);
      const url = REQUEST_LOGIN_URL;
      postInfo(
        url,
        state,
        (response) => {
          const token = response.data.message;
          const user = {
            name: state.name,
            token,
          };
          setAlert({ severity: 'success', message: 'Login successfully!' });
          localStorage.setItem('user', JSON.stringify(user));
          history.push(`${HOME_URL}`);
        },
        (error) => {
          setIsLoading(false);
          if (error.response.status === 401) {
            setAlert({
              severity: 'error',
              message: error.response.data.message,
            });
          }
          if (error.response.status === 422) {
            setAlert({
              severity: 'error',
              param: error.response.data.errors[0].param,
              message: error.response.data.errors[0].msg,
            });
          }
        },
      );
    }
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" align="center">
          <Box fontWeight="fontWeightBold">LOGIN</Box>
        </Typography>
        <Typography variant="subtitle1">Name</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        {alert.message && alert.param === 'name' ? (
          <Alert severity={alert.severity} className={classes.alert}>
            {alert.message}
          </Alert>
        ) : null}
        <Typography variant="subtitle1">Password</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
        {alert.message && alert.param === 'password' ? (
          <Alert severity={alert.severity} className={classes.alert}>
            {alert.message}
          </Alert>
        ) : null}
        <Link href={HOME_URL} variant="body2" component="p" color="textPrimary">
          Forgot Password
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
          disableElevation
          disabled={isLoading}
          className={classes.submit}
        >
          LOGIN
        </Button>
        <Link href={SIGNUP_URL} color="textPrimary">
          <Typography variant="body2" align="center">
            Not have an account?
            <strong>{' Sign Up'}</strong>
          </Typography>
        </Link>
      </form>
      {alert.message && !alert.param ? (
        <Alert severity={alert.severity} className={classes.alert}>
          {alert.message}
        </Alert>
      ) : null}
    </Container>
  );
}

export default Login;
