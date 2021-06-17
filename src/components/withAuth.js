/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

function withAuth(Component) {
  return (props) => {
    const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
    return (
      <Component
        {...props}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    );
  };
}

export default withAuth;
