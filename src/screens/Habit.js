import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  REQUEST_ACTIVITES_URL,
  REQUEST_CHANGE_STATUS_URL,
  REQUEST_HABIT_URL,
} from '../config';
import CheckForm from '../components/CheckForm';
import { getInfoWithToken, postInfoWithToken } from '../services/AxiosServices';
import CalendarSingle from '../components/CalendarSingle';
import HabitBanner from '../components/HabitBanner';

function Habit() {
  const { habitId } = useParams();
  const [habit, setHabit] = useState();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState();
  const [toggleUpdate, setToggleUpdate] = useState(false);

  useEffect(() => {
    let mounted = true;
    getInfoWithToken(
      REQUEST_HABIT_URL + habitId,
      (response) => {
        if (mounted) {
          console.log(response.data.data);
          setHabit(response.data.data);
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
    postInfoWithToken(
      REQUEST_ACTIVITES_URL,
      {
        listHabitId: [habitId],
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
        }
      },
      (error) => console.log(error),
    );
    return () => {
      mounted = false;
    };
  }, [toggleUpdate]);

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
      {habit && <HabitBanner habit={habit} />}
      <CalendarSingle
        activities={activities}
        setSelectedActivity={(activity) => setSelectedActivity(activity)}
      />
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

export default Habit;
