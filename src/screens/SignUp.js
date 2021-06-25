import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { LOGIN_URL, REQUEST_SIGNUP_URL } from '../config';
import { postInfo } from '../services/AxiosServices';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10, 5),
    borderRadius: '25px',
  },
  grid: {
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(4, 0, 0),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
}));

function SignUp() {
  const classes = useStyles();

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    job: '',
  });

  const [alert, setAlert] = useState({
    severity: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: '' });
  };
  const handleJobChange = (job) => {
    if (state.job === job) {
      setState((prevState) => ({
        ...prevState,
        job: '',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        job,
      }));
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.name === '' || state.email === '' || state.password === '') {
      setAlert({
        severity: 'error',
        message: 'Please enter all required information!',
      });
    } else {
      setAlert({ severity: 'info', message: 'Signing up...Please wait' });
      setIsLoading(true);
      const url = REQUEST_SIGNUP_URL;
      postInfo(
        url,
        state,
        (response) => {
          setAlert({ severity: 'success', message: response.data.message });
          setTimeout(() => history.push(LOGIN_URL), 3000);
        },
        (error) => {
          setIsLoading(false);
          if (error.response.status === 400) {
            setAlert({
              severity: 'error',
              param: 'name',
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
          <Box fontWeight="fontWeightBold">SIGN UP</Box>
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
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          variant="outlined"
          fullWidth
          margin="dense"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        {alert.message && alert.param === 'email' ? (
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
        <Typography variant="subtitle1">You are (optional)</Typography>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs>
            <Button
              fullWidth
              name="student"
              variant={state.job === 'student' ? 'contained' : 'outlined'}
              onClick={() => handleJobChange('student')}
              color="default"
            >
              STUDENT
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              fullWidth
              name="staff"
              variant={state.job === 'staff' ? 'contained' : 'outlined'}
              color="default"
              onClick={() => handleJobChange('staff')}
            >
              STAFF
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              fullWidth
              name="other"
              variant={state.job === 'other' ? 'contained' : 'outlined'}
              color="default"
              onClick={() => handleJobChange('other')}
            >
              OTHER
            </Button>
          </Grid>
        </Grid>
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
          SIGN UP
        </Button>
      </form>
      {alert.message && !alert.param ? (
        <Alert severity={alert.severity} className={classes.alert}>
          {alert.message}
        </Alert>
      ) : null}
    </Container>
  );
}

export default SignUp;
