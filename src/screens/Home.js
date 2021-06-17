import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/react-big-calendar-custom.css';
import '../css/year-view-custom.css';
import { useEffect, useState } from 'react';
import {
  REQUEST_ACTIVITES_URL,
  REQUEST_CHANGE_STATUS_URL,
  REQUEST_HABITS_URL,
} from '../config';
import CheckForm from '../components/CheckForm';
import { getInfoWithToken, postInfoWithToken } from '../services/AxiosServices';
import CalendarMultiple from '../components/CalendarMultiple';
import CalendarSingle from '../components/CalendarSingle';
import HabitBanner from '../components/HabitBanner';
import LoadingLayer from '../components/LoadingLayer';

function Home() {
  const [habits, setHabits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getInfoWithToken(
      REQUEST_HABITS_URL,
      (response) => {
        if (mounted) {
          setHabits(response.data.data);
          setIsLoading(false);
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
      setIsLoading(true);
      postInfoWithToken(
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
                title: activity.habitName,
              })),
            );
            setIsLoading(false);
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
    postInfoWithToken(
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
      {habits.length === 1 && <HabitBanner habit={habits[0]} />}
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
      <LoadingLayer open={isLoading} />
    </>
  );
}

export default Home;
