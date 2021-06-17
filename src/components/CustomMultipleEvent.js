import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import StatusIcon from './StatusIcon';
import { GRAY } from '../config';
import CheckButton from './CheckButton';

function CustomMultipleEvent({ event }) {
  const statusIcon = (status) => {
    switch (status) {
      case 'done':
        return <StatusIcon isDone />;
      case 'undone':
        return <StatusIcon isDone={false} />;
      default:
        return <CheckButton />;
    }
  };
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      justifyContent="flex-end"
      height={24}
      px={0.5}
      borderColor={GRAY}
      border={1}
    >
      <Box flexGrow={1} overflow="hidden" textOverflow="ellipsis">
        {event.note}
      </Box>
      <Box mb={1}>{statusIcon(event.status)}</Box>
    </Box>
  );
}

CustomMultipleEvent.propTypes = {
  event: PropTypes.shape({
    status: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomMultipleEvent;
