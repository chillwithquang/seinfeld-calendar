import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import StatusIcon from './StatusIcon';
import { DONE_COLOR } from '../config';

function CustomSingleEvent({ event }) {
  const statusIcon = (status) => {
    switch (status) {
      case 'done':
        return <StatusIcon isDone size="65px" />;
      case 'undone':
        return <StatusIcon isDone={false} size="65px" />;
      default:
        return null;
    }
  };
  return (
    <>
      <Box display="flex" flexWrap="nowrap" justifyContent="flex-end">
        <Box mb={0.25}>{statusIcon(event.status)}</Box>
      </Box>
      <Box
        width="100%"
        position="absolute"
        bottom={10}
        px={1}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color={event.status === 'done' ? DONE_COLOR : 'black'}
      >
        {event.note}
      </Box>
    </>
  );
}

CustomSingleEvent.propTypes = {
  event: PropTypes.shape({
    status: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomSingleEvent;
