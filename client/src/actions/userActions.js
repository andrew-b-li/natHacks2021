import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import * as H from '../utils/helpers';

export const getUserById = ({ userId }, setData) => {
  axios
    .get(`/api/users/get/${userId}`)
    .then(function (res) {
      if (res.status === 200) setData(res.data);
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const fetchAllUsers = (currUserId, setUsers) => {
  axios
    .get('/api/users/all')
    .then(function (res) {
      console.log(res);
      setUsers(res.data.filter((x) => x._id !== currUserId));
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const fetchUserCalendar = (setUserEvents) => {
  axios
    .get('/api/users/calendar')
    .then(function (res) {
      console.log(res);
      setUserEvents(
        res.data.events.map((x) => ({
          title: x.title,
          start: x.startDate,
          end: x.endDate,
        }))
      );
    })
    .catch(function (err) {
      console.error(err);
    });
};

// TODO: Check for clinician authorization here
export const addEventToPatientCalendar = (data, notification) => {
  axios
    .post('/api/users/calendar/event/create', {
      ...data,
    })
    .then(function (res) {
      if (res.status === 200)
        notification.add('addEventToPatientCalendarSuccess', {
          type: 'success',
          message:
            'Task successfully added to patient schedule.' ||
            H.defaultSuccessMessage(),
        });
    })
    .catch(function (err) {
      console.error(err);
    });
};

export const deleteEventFromPatientCalendar = ({ targetId, eventId }) => {
  axios
    .post('/api/users/calendar/event/delete', { targetId, eventId })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};
