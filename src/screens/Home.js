/* eslint-disable no-debugger */
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { REQUEST_CHANGE_STATUS_URL, REQUEST_ACTIVITES_URL } from '../config';
import CheckForm from '../components/CheckForm';
import { postInfowithToken } from '../services/AxiosServices';
import CalendarMultiple from '../components/CalendarMultiple';
import CalendarSingle from '../components/CalendarSingle';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/react-big-calendar-custom.css';
import '../css/single-view-custom.css';
import { HabitContext } from '../contexts/HabitContext';

function Home() {
  const { habits } = useContext(HabitContext);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (habits.length > length) {
      postInfowithToken(
        REQUEST_ACTIVITES_URL,
        {
          listHabitId: habits
            .slice(length, habits.length)
            .map((habit) => habit.id),
        },
        (response) => {
          const newActivity = response.data.data.map((activity) => ({
            ...activity,
            start: moment(activity.date).startOf('day').toDate(),
            end: moment(activity.date).startOf('day').toDate(),
          }));
          setActivities((preActivity) => [...preActivity, ...newActivity]);
          setLength(habits.length);
        },
        (error) => console.log(error),
      );
    }
  }, [habits.length, toggleUpdate]);

  const handleSubmit = (activity) => {
    let mounted = true;
    const { id, status, note } = activity;
    postInfowithToken(
      REQUEST_CHANGE_STATUS_URL,
      {
        activityId: id,
        status,
        note,
      },
      () => {
        if (mounted) {
          setToggleUpdate(!toggleUpdate);
          setSelectedActivity();
        }
      },
      (error) => console.log(error),
    );
    return () => {
      mounted = false;
    };
  };

  return (
    <>
      {habits.length === 1 && <div>{habits[0].name.toUpperCase()}</div>}
      {habits.length <= 1 ? (
        <CalendarSingle
          activities={activities}
          setSelectedActivity={(activity) => setSelectedActivity(activity)}
        />
      ) : (
        <CalendarMultiple
          activities={activities}
          setSelectedActivity={(activity) => setSelectedActivity(activity)}
        />
      )}
      {selectedActivity && (
        <CheckForm
          open
          activity={selectedActivity}
          onClose={() => setSelectedActivity()}
          handleSubmit={(activity) => handleSubmit(activity)}
        />
      )}
    </>
  );
}

export default Home;
