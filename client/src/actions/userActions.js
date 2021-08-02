import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import * as H from '../utils/helpers';

export const fetchUserCalendar = () => {
  axios
    .get('/api/users/calendar')
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.error(err);
    });
};

// TODO: Check for clinician authorization here
export const addEventToPatientCalendar = ({ targetId, events }) => {
  axios
    .post('/api/users/calendar/event/create', {
      targetId: targetId,
      events: events,
    })
    .then(function (res) {
      console.log(res);
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
