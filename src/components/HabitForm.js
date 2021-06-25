/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-wrap-multilines */
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { format } from 'date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { Alert } from '@material-ui/lab';
import TextInput from './TextInput';
import ColorPicker from './ColorPicker';
import { postHabit } from '../services/AxiosServices';
import DatePicker from './DatePicker';
import { HabitContext } from '../contexts/HabitContext';

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

export default function HabitForm({ idHabit, children }) {
  const classes = useStyles();

  const { message, setMessage } = useContext(HabitContext);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickerDisplay, setPickerDisplay] = useState(true);
  const [color, setColor] = useState('#1273DE');
  const [check, setCheck] = useState(false);
  const [endType, setEndType] = useState('on');

  const [repeatArray, setRepeatArray] = useState(Array(7).fill(false));

  const initialState = {
    name: '',
    slogan: '',
    dayAfter: '',
  };

  const [state, setState] = useState(initialState);

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

  useEffect(() => () => {
    if (open === false) {
      setPickerDisplay(false);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setAlert({ ...alert, message: '' });
  };

  const onOpenClick = () => {
    setAlert({ ...alert, message: '' });
    if (message) {
      setMessage('');
    }
    setOpen(true);
  };

  const onCloseClick = () => {
    setState(initialState);
    setStartDate(new Date());
    setEndDate(new Date());
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.name === '') {
      setAlert({
        severity: 'error',
        message: 'Name is not empy!',
      });
      setOpen(true);
    } else {
      if (endDate.getTime() < startDate.getTime()) {
        setAlert({
          severity: 'error',
          message: 'End day is not less than Start day!',
        });

        setStartDate(new Date());
        setOpen(true);
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
      setState(initialState);
      setStartDate(new Date());
      setEndDate(new Date());

      postHabit(JSON.stringify(data), (response) => {
        setMessage(response.data.message);
      });
      setOpen(false);
    }
  };

  const onChangeDate = (_date, isDayEnd) => {
    if (isDayEnd) {
      setEndDate(_date);
    } else {
      setStartDate(_date);
    }
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={onOpenClick}>
        {children}
      </Button>
      <Dialog
        open={open}
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
            {idHabit !== null ? 'UPDATE' : 'CREATE NEW'}
          </DialogTitle>
        </Typography>

        {alert.message !== '' && (
          <Alert severity={alert.severity}>{alert.message}</Alert>
        )}
        <DialogContent>
          <Grid container spacing={2}>
            <TextInput id="name" autoFocus onChange={handleChange}>
              Name
            </TextInput>
            <TextInput id="slogan" rows={4} onChange={handleChange}>
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
                  value={endDate}
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
                margin="dense"
                variant="outlined"
                value={state.dayAfter}
                name="dayAfter"
                disabled={endType !== 'after'}
                fullWidth
                style={{ height: 40, padding: 0 }}
                onChange={handleChange}
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
  idHabit: null,
};

HabitForm.propTypes = {
  idHabit: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
