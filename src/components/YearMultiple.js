/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import EventsPopup from './EventsPopup';

const dates = require('react-big-calendar/lib/utils/dates');

export function createCalendar(startDate) {
  const first = moment(startDate);
  const last = first.clone().endOf('month');
  const weeksCount = Math.ceil((first.day() + last.date()) / 7);

  const calendar = Object.assign([], { first, last });
  calendar.year = first.year();
  calendar.month = first.month();

  for (let weekNumber = 0; weekNumber < weeksCount; weekNumber += 1) {
    const week = [];
    calendar.push(week);
    for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day += 1) {
      const date = first.clone().set('date', day + 1 - first.day());
      date.calendar = calendar;
      week.push(date);
    }
  }

  return calendar;
}

export function isSameDate(firstDate, secondDate) {
  return firstDate.format('YYYY-MM-DD') === secondDate.format('YYYY-MM-DD');
}

function Date({ date, firstDate, events, onClick }) {
  const today = isSameDate(date, moment()) ? 'today' : '';
  const event = events.length > 0 ? 'event-date' : '';
  const month = date.month() === firstDate.month() ? 'in-month' : 'diff-month';

  const offset = () => {
    const rect = document
      .getElementById(date.dayOfYear() + month)
      .getBoundingClientRect();
    const scrLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrTop = window.pageYOffset || document.documentElement.scrollTop;

    if (document.body.clientWidth - (rect.left + scrLeft) < 250) {
      return {
        top: Math.ceil(rect.top + scrTop + 20),
        left: 'auto',
        right: 20,
      };
    }
    return {
      top: Math.ceil(rect.top + scrTop + 20),
      left: Math.ceil(rect.left + scrLeft - 10),
    };
  };

  return (
    <button
      id={date.dayOfYear() + month}
      type="button"
      className={`date ${event} ${month} ${today}`}
      disabled={events.length === 0}
      onClick={() => onClick(events, offset())}
    >
      {events.length > 0 ? <div className="event-dot" /> : null}
      {date.date()}
    </button>
  );
}

Date.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
  firstDate: PropTypes.instanceOf(moment).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClick: PropTypes.func.isRequired,
};

function Month({ startDate, events, handleDayClick }) {
  const [calendar, setCalendar] = useState();

  useEffect(() => {
    setCalendar(createCalendar(startDate));
  }, [startDate]);

  const renderDate = (date) => (
    <Date
      key={date.date()}
      date={date}
      firstDate={calendar.first}
      events={events.filter((event) => isSameDate(moment(event.date), date))}
      onClick={handleDayClick}
    />
  );

  return !calendar ? null : (
    <div className="month">
      <div className="month-name">{moment(startDate).format('MMMM')}</div>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
        <span key={index} className="day">
          {day}
        </span>
      ))}
      <hr className="line" />
      {calendar.map((week, index) => (
        <div key={index}>{week.map((date) => renderDate(date))}</div>
      ))}
    </div>
  );
}

Month.propTypes = {
  startDate: PropTypes.shape().isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handleDayClick: PropTypes.func.isRequired,
};

function Year(props) {
  const { date, events, onSelectEvent } = props;
  const months = [];
  const firstMonth = dates.startOf(date, 'year');
  const [currentEvents, setCurrentEvents] = useState();

  const handleDayClick = (dayEvents, offset) => {
    if (!currentEvents) {
      setCurrentEvents({ events: dayEvents, offset });
    }
  };

  for (let i = 0; i < 12; i += 1) {
    months.push(
      <Month
        key={i}
        handleDayClick={handleDayClick}
        startDate={dates.add(firstMonth, i, 'month')}
        events={events.filter((event) => {
          const diff = Math.abs(moment(event.date).month() - i);
          return diff <= 1 || diff === 11;
        })}
      />,
    );
  }
  return (
    <>
      <div className="year">{months.map((month) => month)}</div>
      {currentEvents && (
        <EventsPopup
          events={currentEvents.events}
          offset={currentEvents.offset}
          onSelectEvent={onSelectEvent}
          onClose={() => setCurrentEvents()}
        />
      )}
    </>
  );
}

Year.propTypes = {
  date: PropTypes.shape().isRequired,
  events: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSelectEvent: PropTypes.func.isRequired,
};

Year.range = (date) => [dates.startOf(date, 'year')];

Year.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'year');
    case navigate.NEXT:
      return dates.add(date, 1, 'year');
    default:
      return date;
  }
};

Year.title = (date, { localizer }) => localizer.format(date, 'YYYY');

export default Year;
