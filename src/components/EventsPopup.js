/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CustomMultipleEvent from './CustomMultipleEvent';

function EventsPopup({ events, offset, onSelectEvent, onClose }) {
  return (
    <ClickAwayListener onClickAway={onClose}>
      <div className="year-rbc-overlay" style={offset}>
        <div className="rbc-overlay-header">
          {events[0].start.toString().slice(0, 15)}
        </div>
        {events.map((event) => (
          <div
            type="popup"
            className="rbc-event"
            role="button"
            tabIndex="0"
            key={event.id}
            onClick={() => onSelectEvent(event)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '0px',
              color: 'black',
              borderWidth: '0px 0px 0px 5px',
              borderStyle: 'solid',
              borderColor: event.color,
              padding: '0px',
              height: '24px',
            }}
          >
            <div className="rbc-event-content" title="Habit 3">
              <CustomMultipleEvent event={event} />
            </div>
          </div>
        ))}
      </div>
    </ClickAwayListener>
  );
}

export default EventsPopup;
