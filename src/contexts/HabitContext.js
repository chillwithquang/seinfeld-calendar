import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const HabitContext = createContext();

function HabitProvider({ children }) {
  const [message, setMessage] = useState('');
  return (
    <HabitContext.Provider value={{ message, setMessage }}>
      {children}
    </HabitContext.Provider>
  );
}

HabitProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { HabitProvider };
