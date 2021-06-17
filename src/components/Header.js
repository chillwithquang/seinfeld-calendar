import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialLink from '@material-ui/core/Link';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import Avatar from '@material-ui/core/Avatar';
import faker from 'faker';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import withAuth from './withAuth';
import { LOGIN_URL, SIGNUP_URL } from '../config';
import LogoCes from '../assets/CES-LOGO-PNG.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 5px #888',
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
  cover: {
    margin: 'auto',
  },
  iconList: {
    color: '#888',
    marginRight: theme.spacing(5),
    fontSize: '45px',
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    color: '#888',
  },
  report: {
    color: '#888',
    marginLeft: '25px',
  },
  icon: {
    color: '#888',
    marginLeft: '25px',
  },
  avatar: {
    marginLeft: '25px',
  },
  name: {
    color: '#888',
    marginLeft: '25px',
    textTransform: 'capitalize',
  },
}));

function Header({ loggedInUser, setLoggedInUser }) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState(null);

  const theme = createMuiTheme({
    palette: {
      primary: { main: blue[700] },
    },
  });

  function LoggedIn() {
    return (
      <Toolbar>
        <Typography variant="h6">
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
              Create New Habit
            </Button>
          </ThemeProvider>
        </Typography>
        <Typography variant="body2" className={classes.report}>
          Report
        </Typography>
        <NotificationsOutlinedIcon className={classes.icon} />
        <Avatar src={avatar} className={classes.avatar} />
        <Typography variant="subtitle1" className={classes.name}>
          {loggedInUser}
        </Typography>
      </Toolbar>
    );
  }

  function NotLoggedIn() {
    setLoggedInUser('');
    return (
      <Toolbar>
        <MaterialLink to={LOGIN_URL} component={Link} underline="none">
          <Button className={classes.btn}>Login</Button>
        </MaterialLink>
        <MaterialLink to={SIGNUP_URL} component={Link} underline="none">
          <Button className={classes.btn}>Signup</Button>
        </MaterialLink>
      </Toolbar>
    );
  }

  useEffect(() => {
    setAvatar(() => faker.image.avatar());
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.nav}>
          <Icon className={classes.iconList}>list</Icon>
          <Typography component="div" className={classes.title}>
            <MaterialLink to="/" component={Link} exact>
              <img
                className={classes.cover}
                src={LogoCes}
                alt="Code Engine Studio"
              />
            </MaterialLink>
          </Typography>
          {loggedInUser && loggedInUser.length > 0 ? (
            <LoggedIn />
          ) : (
            <NotLoggedIn />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  loggedInUser: PropTypes.string.isRequired,
  setLoggedInUser: PropTypes.string.isRequired,
};

export default withRouter(withAuth(Header));
