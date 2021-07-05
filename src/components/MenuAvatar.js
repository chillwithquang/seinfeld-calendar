/* eslint-disable react/forbid-prop-types */
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME_URL, HABITS_URL } from '../config';
import { AuthContext } from '../contexts/AuthContext';

export default function MenuAvatar({ history, children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLoggedInUser } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedInUser('');
    history.push(`${HOME_URL}`);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Typography variant="subtitle1" style={{ textTransform: 'capitalize' }}>
          {children}
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: 36, left: 8 }}
      >
        <MenuItem onClick={handleClose}>My profile</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={HABITS_URL}>
          Habits
        </MenuItem>
        <MenuItem onClick={handleClose}>Setting</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

MenuAvatar.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
