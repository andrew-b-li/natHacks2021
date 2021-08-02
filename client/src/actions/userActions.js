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
export const addEventToPatientCalendar = () => {
  axios
    .post('/api/users/calendar/event/create', {
      targetId: '61061bac1d26a229a069f832',
      events: [
        {
          startDate: '1627866232444',
          endDate: '1627866232444',
          title: 'Test event',
        },
      ],
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
