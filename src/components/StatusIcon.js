import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DONE_COLOR, UNDONE_COLOR } from '../config/colors';

const useStyles = makeStyles(() => ({
  icon: {
    color: (props) => (props.isDone ? DONE_COLOR : UNDONE_COLOR),
    fontSize: (props) => props.size,
  },
}));

function StatusIcon({ size, isDone }) {
  const classes = useStyles({ size, isDone });
  return (
    <Icon className={classes.icon}>{isDone ? 'check_circle' : 'cancel'}</Icon>
  );
}
StatusIcon.defaultProps = {
  size: '24px',
};
StatusIcon.propTypes = {
  size: PropTypes.string,
  isDone: PropTypes.bool.isRequired,
};

export default StatusIcon;
