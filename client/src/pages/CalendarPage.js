import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import {
  Box,
  Button,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import theme from 'config/theme';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Contexts
import { AppContext } from 'contexts/AppContext';
import { UserContext } from 'contexts/UserContext';
import { useNotificationQueue } from 'contexts/NotificationsContext';

// Components
// import { Scheduler } from '@aldabil/react-scheduler';

// Helpers
import {
  ClearBlock,
  GridContainer,
  GridItem,
  Link,
  PageContainer,
  SpacedGridContainer,
} from 'components/styles/global';

// Hooks
import useDidMountEffect from 'components/useDidMountEffect';
import useDidMount from 'components/useDidMount';

// Scripts and actions
// import script from 'python/script.py';
import { loginUser } from 'actions/authActions';
import Calendar from 'components/Calendar';
import moment from 'moment';
import {
  addEventToPatientCalendar,
  deleteEventFromPatientCalendar,
  fetchUserCalendar,
} from 'actions/userActions';

// #region Styling

// #endregion

const CalendarPage = styled(({ ...props }) => {
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // Set layout options (e.g. page title, dispaly header, etc.)
  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'User Calendar | neural.ly - neurofeedback from home.',
      hideHeader: false,
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [userType, setUserType] = useState(null);
  const [userEvents, setUserEvents] = useState([]);

  // User state change listeners
  useEffect(() => {
    // User is authenticated
    if (userCtx.auth.userData) {
      // console.log(userCtx.auth.userData);
      setUserType(userCtx.auth.userData.userType);
      // fetchUserEvents(userCtx.auth.userData, setUserEvents);

      // deleteEventFromPatientCalendar({
      //   targetId: '6106e135d8f3797a80e15b60',
      //   eventId: '61074ad391fdbf2eac16e9c6',
      // });

      // fetchUserCalendar();
    }
  }, [userCtx.auth.isAuthenticated]);

  // const userEvents = [
  //   {
  //     id: 0,
  //     title: 'All Day Event very long title',
  //     allDay: true,
  //     start: moment().toDate(),
  //     end: moment().add(10, 'days').toDate(),
  //   },
  // ];
  const selectable = userType === 'clinician';

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 10, lg: 10, xl: 10 }} />
      <Grid item xs={11}>
        <SpacedGridContainer>
          <Grid item xs={12} sm={8} lg={6}>
            <Calendar
              events={userEvents}
              onSelectEvent={(event, e) => console.log(event, e)}
            />
          </Grid>
          <Grid item xs={12} sm={3} lg={4}></Grid>
        </SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 10, lg: 10, xl: 10 }} />
    </PageContainer>
  );
})``;

export default CalendarPage;
