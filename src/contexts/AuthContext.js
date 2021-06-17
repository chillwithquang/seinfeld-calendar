import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

function AuthProvider({ children, initialLoggedInUser }) {
  const [loggedInUser, setLoggedInUser] = useState(initialLoggedInUser);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialLoggedInUser: PropTypes.string.isRequired,
};

export { AuthProvider };
