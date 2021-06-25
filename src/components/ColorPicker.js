import { TwitterPicker } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  ORANGE,
  RED,
  PINK,
  PURPLE,
  DEEP_PURPLE,
  INDIGO,
  LIGHT_BLUE,
  TEAL,
  GREEN,
  YELLOW,
} from '../config';

const useStyles = makeStyles((theme) => ({
  popover: {
    position: 'absolute',
    zIndex: '2',
    top: theme.spacing(6),
    left: theme.spacing(-2),
  },
  cover: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
}));

const colors = [
  `${ORANGE}`,
  `${RED}`,
  `${PINK}`,
  `${PURPLE}`,
  `${DEEP_PURPLE}`,
  `${INDIGO}`,
  `${LIGHT_BLUE}`,
  `${TEAL}`,
  `${GREEN}`,
  `${YELLOW}`,
];
export default function ColorPicker({ color, onSelectColor }) {
  const classes = useStyles();
  return (
    <div className={classes.popover}>
      <TwitterPicker
        color={color}
        colors={colors}
        triangle="hide"
        onChange={(_color) => onSelectColor(_color.hex)}
      />
    </div>
  );
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};
