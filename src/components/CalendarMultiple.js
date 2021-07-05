import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import CustomMultipleEvent from './CustomMultipleEvent';
import Year from './YearMultiple';
import { WHITE, BLACK } from '../config';

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: `${WHITE}`,
    borderRadius: '0px',
    color: `${BLACK}`,
    borderWidth: '0px 0px 0px 5px',
    borderStyle: 'solid',
    borderColor: event.color,
    padding: '0px',
    height: '24px',
  },
});

function CalendarMultiple({ activities, setSelectedActivity }) {
  const localizer = momentLocalizer(moment);

  return (
    <Calendar
      localizer={localizer}
      events={activities}
      startAccessor="start"
      endAccessor="end"
      components={{
        event: CustomMultipleEvent,
      }}
      views={{
        year: Year,
        month: true,
        week: true,
      }}
      messages={{ year: 'Year' }}
      eventPropGetter={eventStyleGetter}
      onSelectEvent={(event) => setSelectedActivity(event)}
      popup
    />
  );
}

CalendarMultiple.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setSelectedActivity: PropTypes.func.isRequired,
};

export default CalendarMultiple;
