/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import { createCalendar, isSameDate } from './YearMultiple';

const dates = require('react-big-calendar/lib/utils/dates');

function Date({ date, firstDate, events, onClick }) {
  const today = isSameDate(date, moment()) ? 'today-outline' : '';
  const month = date.month() === firstDate.month() ? 'in-month' : 'diff-month';
  const status = () => {
    if (events.length === 0) return '';
    return events[0].status;
  };

  return (
    <button
      id={date.dayOfYear() + month}
      type="button"
      className={`date ${today} ${status()} ${month}`}
      disabled={events.length === 0}
      onClick={() => onClick(events[0])}
    >
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

  for (let i = 0; i < 12; i += 1) {
    months.push(
      <Month
        key={i}
        handleDayClick={(event) => onSelectEvent(event)}
        startDate={dates.add(firstMonth, i, 'month')}
        events={events.filter((event) => {
          const diff = Math.abs(moment(event.date).month() - i);
          return diff <= 1 || diff === 11;
        })}
      />,
    );
  }
  return <div className="year">{months.map((month) => month)}</div>;
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
