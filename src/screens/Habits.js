import React, { useState, useEffect, useContext, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { HabitContext } from '../contexts/HabitContext';
import HabitForm from '../components/HabitForm';
import { removeHabit, getInfoWithToken } from '../services/AxiosServices';
import { REQUEST_HABITS_URL } from '../config';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const formatDate = (data) => moment(data).format('MMMM Do YYYY');

export default function Habits() {
  const classes = useStyles();

  const { habits, setHabits, setMessage } = useContext(HabitContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [habitId, setHabitId] = useState(null);
  const [rows, setRows] = useState(habits);

  const deleteRowHabit = useCallback(async () => {
    try {
      const response = await removeHabit(habitId);
      getInfoWithToken(REQUEST_HABITS_URL, (_response) => {
        setHabits(() => [..._response.data.data]);
        setMessage(response.data.message);
      });
      setHabitId(null);
      setIsDelete(false);
    } catch (err) {
      console.log(err);
    }
  }, [habitId]);

  useEffect(() => {
    setRows(habits);
    if (habitId !== null && isDelete === true) {
      deleteRowHabit();
    }
  }, [habits, deleteRowHabit, isDelete]);

  const handleClickClose = (_isOpen) => {
    setIsOpen(_isOpen);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Habit</StyledTableCell>
              <StyledTableCell align="center">Start Day</StyledTableCell>
              <StyledTableCell align="center">EndDay</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((habit) => (
              <StyledTableRow key={habit.id}>
                <StyledTableCell component="th" scope="row">
                  {habit.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(habit.startDate)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(habit.endDate)}
                </StyledTableCell>
                <StyledTableCell align="center" key={habit.id}>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setHabitId(habit.id);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setHabitId(habit.id);
                      setIsDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isOpen && (
        <HabitForm
          idHabit={habitId}
          isOpen={isOpen}
          handleClickClose={handleClickClose}
        />
      )}
    </>
  );
}
