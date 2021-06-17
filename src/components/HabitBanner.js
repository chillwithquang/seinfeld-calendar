import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
/* eslint-disable react/prop-types */
const useStyles = makeStyles(() => ({
  grid: {
    margin: '0px 10px',
  },
  name: {
    fontWeight: 'bold',
  },
}));

function HabitBanner({ habit }) {
  const classes = useStyles();
  return (
    <Grid container spacing={1} className={classes.grid}>
      <Grid item xs={6}>
        <Typography variant="h5" className={classes.name}>
          {habit.name.toUpperCase()}
        </Typography>
        <Typography variant="body1" component="div">
          <Box color="text.secondary" display="inline">
            Start
          </Box>
          {` ${moment(habit.startDate).format('DD MMM YYYY')}`}
          &emsp;
          <Box color="text.secondary" display="inline">
            End
          </Box>
          {` ${moment(habit.endDate).format('DD MMM YYYY')}`}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">{habit.slogan}</Typography>
      </Grid>
    </Grid>
  );
}
export default HabitBanner;
