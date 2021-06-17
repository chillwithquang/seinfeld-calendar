import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  REQUEST_ACTIVITES_URL,
  REQUEST_CHANGE_STATUS_URL,
  REQUEST_HABITS_URL,
} from '../config';
import CheckForm from '../components/CheckForm';
import { getInfowithToken, postInfowithToken } from '../services/AxiosServices';
import CalendarMultiple from '../components/CalendarMultiple';
import CalendarSingle from '../components/CalendarSingle';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/react-big-calendar-custom.css';
import '../css/single-view-custom.css';

function Home() {
  const [habits, setHabits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  useEffect(() => {
    let mounted = true;
    getInfowithToken(
      REQUEST_HABITS_URL,
      (response) => {
        if (mounted) {
          setHabits(response.data.data);
        }
      },
      (error) => console.log(error),
    );
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (habits.length > 0) {
      postInfowithToken(
        REQUEST_ACTIVITES_URL,
        {
          listHabitId: habits.map((habit) => habit.id),
        },

        (response) => {
          if (mounted) {
            setActivities(
              response.data.data.map((activity) => ({
                ...activity,
                start: moment(activity.date).startOf('day').toDate(),
                end: moment(activity.date).startOf('day').toDate(),
              })),
            );
          }
        },
        (error) => console.log(error),
      );
    }
    return () => {
      mounted = false;
    };
  }, [habits, toggleUpdate]);

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
