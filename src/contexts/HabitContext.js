import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getInfoWithToken } from '../services/AxiosServices';
import { REQUEST_HABITS_URL } from '../config';

export const HabitContext = createContext();

function HabitProvider({ children }) {
  const [message, setMessage] = useState('');
  const [habits, setHabits] = useState([]);

  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user !== null) {
      getInfoWithToken(
        REQUEST_HABITS_URL,
        (response) => {
          setHabits(() => [...response.data.data]);
        },
        (error) => console.log(error),
      );
    }
  }, [user]);

  return (
    <HabitContext.Provider
      value={{
        message,
        setMessage,
        habits,
        setHabits,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

HabitProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { HabitProvider };
