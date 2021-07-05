/* eslint-disable no-debugger */
import { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/react-big-calendar-custom.css';
import '../css/year-view-custom.css';
import { REQUEST_ACTIVITES_URL, REQUEST_CHANGE_STATUS_URL } from '../config';
import CheckForm from '../components/CheckForm';
import { postInfoWithToken } from '../services/AxiosServices';
import CalendarMultiple from '../components/CalendarMultiple';
import CalendarSingle from '../components/CalendarSingle';
import HabitBanner from '../components/HabitBanner';
import LoadingLayer from '../components/LoadingLayer';
import { HabitContext } from '../contexts/HabitContext';

function Home() {
  const { habits } = useContext(HabitContext);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [length, setLength] = useState(0);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    if (habits.length > length) {
      postInfoWithToken(
        REQUEST_ACTIVITES_URL,
        {
          listHabitId: habits
            .slice(length, habits.length)
            .map((habit) => habit.id),
        },
        (response) => {
          if (mounted) {
            const newActivity = response.data.data.map((activity) => ({
              ...activity,
              start: moment(activity.date).startOf('day').toDate(),
              end: moment(activity.date).startOf('day').toDate(),
            }));
            setActivities((preActivity) => [...preActivity, ...newActivity]);

            setLength(habits.length);
            setIsLoading(false);
          }
        },
        (error) => console.log(error),
      );
    }
    return () => {
      mounted = false;
    };
  }, [habits.length]);

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
          const temp = activities.slice();
          const index = temp.findIndex((_activity) => _activity.id === id);
          temp[index] = { ...temp[index], status, note };
          setActivities(temp);
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
