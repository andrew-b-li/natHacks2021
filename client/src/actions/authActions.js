import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import * as H from '../utils/helpers';

import NotificationList from 'components/layout/NotificationList';

// Login - get user token
export const loginUser = (userData, dispatch, notification, history) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      notification.add('loginSuccess', {
        type: 'success',
        message: 'Sign in successful' || H.defaultSuccessMessage(),
      });

      // Set current user
      dispatch({
        type: 'USER_DATA_SUCCESS',
        payload: decoded,
      });
    })
    .catch(
      (err) => {
        if (err.response.data) {
          dispatch({ type: 'USER_DATA_FAIL' });
          notification.add('loginError', {
            type: 'error',
            message: err.response.data?.errMsg || H.defaultErrorMessage(),
          });
        }
        //   console.error(err.response.data)
      }
      //   dispatchNotification({
      //     type: 'error',
      //     payload: err.response.data,
      //   })
    );
};

// Register User
export const registerUser = (userData, dispatch, notification) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => {
      if (res.status === 200) {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);

        // Set token to Auth header
        setAuthToken(token);

        // Decode token to get user data
        const decoded = jwt_decode(token);

        notification.add('registerAndLoginSuccess', {
          type: 'success',
          message:
            'Sign up successful. Logging you in...' ||
            H.defaultSuccessMessage(),
        });

        // Set current user
        dispatch({
          type: 'USER_DATA_SUCCESS',
          payload: decoded,
        });

        // dispatch({ type: 'USER_DATA_SUCCESS' });
        // notification.add('signUpError', {
        //   type: 'error',
        //   message: err.response.data?.errMsg || H.defaultErrorMessage(),
        // });
      } else {
        dispatch({ type: 'USER_DATA_FAIL' });
        notification.add('signUpError', {
          type: 'error',
          message: H.defaultErrorMessage(),
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({ type: 'USER_DATA_FAIL' });
      notification.add('signUpError', {
        type: 'error',
        message: err.response.data?.errMsg || H.defaultErrorMessage(),
      });
    });
};

export const logoutUser = (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');

  // Remove auth header for future requests
  setAuthToken(false);

  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch({ type: 'REQUEST_LOGOUT' });
};
