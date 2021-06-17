import PropTypes from 'prop-types';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { BG_DONE, BG_UNDONE, DONE_COLOR } from '../config';
import CustomSingleEvent from './CustomSingleEvent';

const eventStyleGetter = (event) => {
  let backgroundColor;
  switch (event.status) {
    case 'done':
      backgroundColor = BG_DONE;
      break;
    case 'undone':
      backgroundColor = BG_UNDONE;
      break;
    default:
      backgroundColor = 'white';
      break;
  }
  return {
    style: {
      backgroundColor,
      borderRadius: '0px',
      color: 'black',
      borderWidth: '2px',
      borderStyle: event.status === 'done' ? 'solid' : 'hidden',
      borderColor: DONE_COLOR,
      padding: '0px',
      height: '123px',
    },
  };
};

function CalendarSingle({ activities, setSelectedActivity }) {
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      className="single-view"
      localizer={localizer}
      events={activities}
      startAccessor="start"
      endAccessor="end"
      components={{
        event: CustomSingleEvent,
      }}
      style={{ height: '90vh' }}
      views={{
        day: true,
        week: true,
        month: true,
      }}
      eventPropGetter={eventStyleGetter}
      onSelectEvent={(event) => setSelectedActivity(event)}
    />
  );
}

CalendarSingle.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSelectedActivity: PropTypes.func.isRequired,
};

export default CalendarSingle;
