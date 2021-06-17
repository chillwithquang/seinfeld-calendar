import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StatusIcon from './StatusIcon';
import { DONE_COLOR, GRAY, UNDONE_COLOR } from '../config';

const useStyles = makeStyles((theme) => ({
  date: {
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    userSelect: 'none',
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

function CheckForm({ open, activity, onClose, handleSubmit }) {
  const classes = useStyles();
  const [state, setState] = useState();

  useEffect(() => {
    const { id, start, status, note } = activity;
    setState({
      id,
      date: start.toString().slice(0, 15),
      status,
      note,
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeStatus = (status) => {
    if (state.status === status) {
      setState({ ...state, status: 'uncheck' });
    } else {
      setState({ ...state, status });
    }
  };

  return state ? (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" className={classes.date}>
              {state.date}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              border={3}
              borderColor={state.status === 'done' ? DONE_COLOR : GRAY}
              onClick={() => changeStatus('done')}
            >
              <Box display="flex" justifyContent="center">
                <StatusIcon isDone size="100px" />
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" className={classes.label}>
                  YES
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              border={3}
              borderColor={state.status === 'undone' ? UNDONE_COLOR : GRAY}
              onClick={() => changeStatus('undone')}
            >
              <Box display="flex" justifyContent="center">
                <StatusIcon isDone={false} size="100px" />
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" className={classes.label}>
                  NO
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography variant="body1">Add Note</Typography>
            </Box>
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="note"
              value={state.note}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box py={1}>
              <Button
                variant="outlined"
                color="default"
                className={classes.button}
                onClick={() => onClose()}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSubmit(state)}
              >
                SAVE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  ) : null;
}

CheckForm.propTypes = {
  open: PropTypes.bool.isRequired,
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CheckForm;
