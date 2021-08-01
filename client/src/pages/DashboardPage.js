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

// Helpers
import { docReady, checkVisible } from 'utils/helpers';

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

const DashboardPage = styled(({ ...props }) => {
  const history = useHistory();
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'User Dashboard | neural.ly',
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // User state change listeners
  useDidMountEffect(() => {
    // User is authenticated
  }, [userCtx.auth?.isAuthenticated]);

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <Grid item xs={11}>
        <SpacedGridContainer>
          <Typography variant="h5">
            Welcome, {userCtx?.auth?.userData?.name}.
          </Typography>
        </SpacedGridContainer>
      </Grid>
    </PageContainer>
  );
})`
  position: relative;
`;

export default DashboardPage;
