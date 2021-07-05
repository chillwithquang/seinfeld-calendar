/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { format, parse } from 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import addDays from 'date-fns/addDays';
import TextInput from './TextInput';
import ColorPicker from './ColorPicker';
import {
  postHabit,
  getHabit,
  getInfoWithToken,
  updateHabit,
} from '../services/AxiosServices';
import DatePicker from './DatePicker';
import { HabitContext } from '../contexts/HabitContext';
import { BLUE } from '../config/colors';
import { REQUEST_HABITS_URL } from '../config';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
  },
  colorLabel: {
    marginLeft: theme.spacing(2),
  },
  colorBtn: {
    marginLeft: theme.spacing(2),
    marginTop: '5px',
    width: theme.spacing(5),
    height: theme.spacing(5),
    minWidth: theme.spacing(5),
    borderRadius: '50%',
  },
  colorIcon: {
    fontSize: theme.spacing(7),
  },
  btnCircle: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    minWidth: theme.spacing(6),
    borderRadius: '50%',
  },
  radioBtn: {
    marginTop: theme.spacing(1),
  },
  dalAction: {
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(3),
  },
  btnAction: {
    width: theme.spacing(10),
    marginLeft: theme.spacing(4),
  },
}));

const initialState = {
  name: '',
  slogan: '',
  dayAfter: 0,
};

const dateFormat = (date) => {
  const dateMoment = moment(date).format('L');
  return parse(dateMoment, 'MM/dd/yyyy', new Date());
};

export default function HabitForm({ idHabit, isOpen, handleClickClose }) {
  const classes = useStyles();

  const { setMessage, setHabits } = useContext(HabitContext);

  const [state, setState] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickerDisplay, setPickerDisplay] = useState(false);
  const [color, setColor] = useState(BLUE);
  const [check, setCheck] = useState(false);
  const [endType, setEndType] = useState('on');
  const [repeatArray, setRepeatArray] = useState(Array(7).fill(false));

  const updateHabitUser = useCallback(async () => {
    if (idHabit !== '') {
      const habit = await getHabit(idHabit);
      const { data } = habit.data;
      setState((prevState) => ({
        ...prevState,
        name: data.name,
        slogan: data.slogan,
      }));
      setStartDate(dateFormat(data.startDate));
      setEndDate(dateFormat(data.endDate));
      setColor(data.color);
      setRepeatArray(data.repeatArray);
      if (data.repeatArray.every((item) => item === true)) {
        setCheck(true);
      }
    }
  }, [idHabit]);

  useEffect(() => {
    updateHabitUser();
  }, [updateHabitUser]);

  const [alert, setAlert] = useState({
    severity: '',
    message: '',
  });

  const dayInWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (index) => {
    const temp = repeatArray.slice();
    temp[index] = !temp[index];
    setRepeatArray(temp);
  };

  const toggleAllDay = (checked) => {
    setRepeatArray(checked ? Array(7).fill(true) : Array(7).fill(false));
    setCheck(checked);
  };

  const handleColor = (colorValue) => {
    setColor(colorValue);
  };

  const handleToggle = () => {
    setPickerDisplay(!pickerDisplay);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: '' });
  };

  const onCloseClick = () => {
    handleClickClose(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.name === '') {
      setAlert({
        severity: 'error',
        message: 'Name is not empty!',
      });
    } else {
      if (endDate.getTime() < startDate.getTime()) {
        setAlert({
          severity: 'error',
          message: 'End day is must not before Start day!',
        });

        setStartDate(new Date());
        return;
      }

      const data = {
        name: state.name,
        slogan: state.slogan,
        color,
        startDate: format(startDate, 'yyyy/MM/dd'),
        endDate: format(endDate, 'yyyy/MM/dd'),
        repeatArray,
      };

      let response = null;
      try {
        if (idHabit !== '') {
          response = await updateHabit(JSON.stringify(data), idHabit);
        } else {
          response = await postHabit(JSON.stringify(data));
        }
        getInfoWithToken(REQUEST_HABITS_URL, (_response) => {
          setHabits(() => [..._response.data.data]);
          setMessage(response.data.message);
          onCloseClick();
        });
      } catch (error) {
        if (error.response && error.response.data) {
          setAlert({
            severity: 'error',
            message: `${
              error.response.data.message !== 'underfined'
                ? error.response.data.message
                : error.response.data.errors[0].msg
            } `,
          });
        }
      }
    }
  };

  const onChangeDate = (_date, isDayEnd) => {
    if (isDayEnd) {
      setEndDate(_date);
    } else {
      setStartDate(_date);
      if (_date > endDate) {
        setEndDate(_date);
      }
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen || false}
        onClose={onCloseClick}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Typography variant="h5">
          <DialogTitle
            id="form-dialog-title"
            disableTypography={false}
            className={classes.title}
          >
            {idHabit ? 'UPDATE' : 'CREATE NEW'}
          </DialogTitle>
        </Typography>

        {alert.message !== '' && (
          <Alert severity={alert.severity}>{alert.message}</Alert>
        )}
        <DialogContent>
          <Grid container spacing={2}>
            <TextInput
              id="name"
              nameHabit={state.name}
              autoFocus
              onChange={handleChange}
            >
              Name
            </TextInput>
            <TextInput
              id="slogan"
              slogan={state.slogan}
              rows={4}
              onChange={handleChange}
            >
              Slogan
            </TextInput>
            <Grid item xs={12} sm={6}>
              <DatePicker value={startDate} onChangeDate={onChangeDate}>
                Start Day
              </DatePicker>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className={classes.colorLabel}>
                Color
              </Typography>
              <Button
                className={classes.colorBtn}
                variant="contained"
                onClick={handleToggle}
                style={{ backgroundColor: `${color}` }}
              >
                {pickerDisplay ? (
                  <ColorPicker color={color} onSelectColor={handleColor} />
                ) : null}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" margin="normal" color="textPrimary">
                Repeat
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={check}
                      onChange={(e) => toggleAllDay(e.target.checked)}
                      name="checked"
                    />
                  }
                  label="All Day"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="space-evenly">
                {repeatArray.map((day, index) => (
                  <Grid item xs key={index}>
                    <Button
                      className={classes.btnCircle}
                      variant="contained"
                      color={day ? 'primary' : 'default'}
                      onClick={() => toggleDay(index)}
                    >
                      {dayInWeek[index]}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" margin="normal" color="textPrimary">
                End
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="endtype"
                  value={endType}
                  onChange={(event) => setEndType(event.target.value)}
                >
                  <FormControlLabel
                    value="on"
                    control={<Radio />}
                    label="On"
                    className={classes.radioBtn}
                  />
                  <FormControlLabel
                    value="after"
                    control={<Radio />}
                    label="After"
                    className={classes.radioBtn}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              {endType === 'on' ? (
                <DatePicker
                  value={startDate > endDate ? startDate : endDate}
                  minDate={startDate}
                  onChangeDate={onChangeDate}
                  dayEnd
                />
              ) : (
                <DatePicker
                  value={endDate}
                  minDate={startDate}
                  onChangeDate={onChangeDate}
                  dayEnd
                  disabled
                />
              )}
              <TextField
                type="number"
                margin="dense"
                variant="outlined"
                name="dayAfter"
                disabled={endType !== 'after'}
                fullWidth
                style={{ height: 40, padding: 0 }}
                onChange={(event) => {
                  setEndDate(addDays(startDate, event.target.value));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} />
          </Grid>
        </DialogContent>

        <Grid item xs={12} sm={6}>
          <DialogActions className={classes.dalAction}>
            <Button
              variant="outlined"
              onClick={onCloseClick}
              color="secondary"
              style={{ width: 80 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="secondary"
              className={classes.btnAction}
            >
              Finish
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </div>
  );
}

HabitForm.defaultProps = {
  idHabit: '',
};

HabitForm.propTypes = {
  idHabit: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
};
