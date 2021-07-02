import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

function TextInput(props) {
  const { id, rows, children, autoFocus, onChange, nameHabit, slogan } = props;
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1">{children}</Typography>
      <TextField
        autoFocus={autoFocus}
        margin="dense"
        defaultValue={nameHabit !== '' ? nameHabit : slogan}
        id={id}
        name={id}
        multiline
        variant="outlined"
        fullWidth
        rows={rows}
        onChange={(event) => onChange(event)}
      />
    </Grid>
  );
}

TextInput.defaultProps = {
  rows: 1,
  autoFocus: false,
  nameHabit: '',
  slogan: '',
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  rows: PropTypes.number,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  nameHabit: PropTypes.string,
  slogan: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TextInput;
