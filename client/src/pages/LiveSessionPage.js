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
import { Scheduler } from '@aldabil/react-scheduler';

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

const LiveSessionPage = styled(({ ...props }) => {
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // Set layout options (e.g. page title, dispaly header, etc.)
  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'neural.ly - neurofeedback from home.',
      hideHeader: false,
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // User state change listeners
  //   useDidMountEffect(() => {
  //     if (userCtx.auth.isAuthenticated) {
  //       history.push('/user/dashboard');
  //     }
  //   }, [userCtx.auth?.isAuthenticated]);

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
      <Grid item xs={11}>
        <SpacedGridContainer
          spacing={isSmall ? 4 : 0}
          direction={isSmall ? 'column' : 'row'}
        ></SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
    </PageContainer>
  );
})``;

export default LiveSessionPage;
