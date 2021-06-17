/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

export default function DatePicker({
  value,
  minDate,
  onChangeDate,
  dayEnd,
  disabled,
  children,
}) {
  const today = new Date();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Typography>{children}</Typography>
      <KeyboardDatePicker
        autoOk
        fullWidth
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        value={value}
        minDate={minDate || today}
        InputAdornmentProps={{ position: 'end' }}
        onChange={(_date) => {
          if (dayEnd) {
            return onChangeDate(_date, true);
          }
          return onChangeDate(_date);
        }}
        disabled={disabled}
        margin="dense"
        style={{ height: 40 }}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.defaultProps = {
  value: null,
  minDate: null,
  dayEnd: false,
  disabled: false,
  children: null,
};

DatePicker.propTypes = {
  value: PropTypes.object,
  minDate: PropTypes.object,
  onChangeDate: PropTypes.func.isRequired,
  dayEnd: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
