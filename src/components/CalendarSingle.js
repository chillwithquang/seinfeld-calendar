import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomSingleEvent from './CustomSingleEvent';
import Year from './YearSingle';
import { BG_DONE, BG_UNDONE, DONE_COLOR, WHITE, BLACK } from '../config';

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
      backgroundColor = `${WHITE}`;
      break;
  }
  return {
    style: {
      backgroundColor,
      borderRadius: '0px',
      color: `${BLACK}`,
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
      views={{
        year: Year,
        month: true,
        week: true,
      }}
      messages={{ year: 'Year' }}
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
