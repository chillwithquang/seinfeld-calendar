import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 4,
  },
  progress: {
    color: 'white',
  },
}));

function LoadingLayer({ open }) {
  const classes = useStyles();
  return (
    <Backdrop open={open} className={classes.backdrop}>
      <CircularProgress className={classes.progress} />
    </Backdrop>
  );
}

LoadingLayer.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LoadingLayer;
