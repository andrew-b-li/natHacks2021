import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import {
  Avatar,
  Box,
  Button,
  Chip,
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

// Assets
// import DashboardImage1 from '';

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
  MotionGrid,
  PageContainer,
  SpacedGridContainer,
} from 'components/styles/global';

// Hooks
import useDidMountEffect from 'components/useDidMountEffect';
import useDidMount from 'components/useDidMount';

// Scripts and actions
// import script from 'python/script.py';
import { loginUser } from 'actions/authActions';

// #region Left side
const CTAText = ({
  userType,
  nextSessionDate,
  patientsNeedingReview,
  ...props
}) => {
  if (userType === 'patient')
    return (
      <Typography variant="h5" align="center" color="textSecondary">
        Your next session is on, {nextSessionDate}.
      </Typography>
    );
  if (userType === 'clinician')
    return (
      <Typography variant="h5" align="center" color="textSecondary">
        The following patients profiles need your attention,{' '}
        <Link>see more.</Link>
        <SpacedGridContainer boxProps={{ pt: 2 }} spacing={2}>
          {patientsNeedingReview.map((patient, idx) => (
            <Grid item key={idx}>
              <Link>
                <Avatar />
              </Link>
            </Grid>
          ))}
        </SpacedGridContainer>
      </Typography>
    );
  return <></>;
};
// #endregion

// #region Right side
const DB__LandingImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 75%;
    height: 75%;
  }
`;
const NewChip = styled((props) => <Chip label="NEW" {...props} />)`
  background: rgba(85, 81, 255, 0.6);
  color: #fff;
`;
// #endregion

// Action cards
const ActionCard = styled(MotionGrid)`
  ${(props) => props.theme._funcs.card({ variant: 'paper-2' })};
`;

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

  //  State vars
  const [userType, setUserType] = useState(null);
  const [nextSessionDate, setNextSessionDate] = useState(null);
  const [patientsNeedingReview, setPatientsNeedingReview] = useState([]);
  const [pendingUserActions, setPendingUserActions] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [activePatients, setActivePatients] = useState([]);
  const [sessionHistory, setSesionHistory] = useState([]);

  // User state change listeners
  useEffect(() => {
    // User is authenticated
    if (userCtx.auth.userData) {
      setUserType(userCtx.auth.userData.userType);
    }
  }, [userCtx.auth.isAuthenticated]);

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 20, lg: 20, xl: 20 }} />
      <Grid item xs={11}>
        <SpacedGridContainer
          spacing={4}
          css={`
            ${isSmall
              ? (props) =>
                  props.theme._funcs.card({
                    variant: 'paper-1',
                    bg: 'rgba(255, 255, 255, 0.95)',
                  })
              : null}
          `}
        >
          {/* Top (welcome message) */}
          <Grid item xs={12}>
            <SpacedGridContainer>
              {/* Left */}
              <Grid item md={6}>
                <SpacedGridContainer gap={10}>
                  <Grid item xs={12}>
                    <Typography variant="h3" align="center">
                      Welcome, {userCtx?.auth?.userData?.name?.split(' ')[0]}.
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <CTAText
                      {...{ userType, nextSessionDate, patientsNeedingReview }}
                    />
                  </Grid>
                </SpacedGridContainer>
              </Grid>

              {/* Right */}
              <Grid
                item
                md={6}
                xs={12}
                css={`
                  position: ${isSmall ? 'absolute' : 'relative'};
                  z-index: ${isSmall ? '-1' : 'initial'};
                  transform: translateY(${isSmall ? '-5%' : 'initial'});
                `}
              >
                <DB__LandingImage src="../img/dashboard.svg" />
              </Grid>
            </SpacedGridContainer>
          </Grid>

          {/* Bottom (action cards) */}
          <Grid item xs={12}>
            <SpacedGridContainer justifyContent="center" spacing={4} gap={24}>
              {[1, 2, 3].map((v, idx) => {
                let data = null;
                switch (idx) {
                  case 0:
                    data = {
                      title: 'Pending Actions',
                      value: pendingUserActions.length,
                      new: pendingUserActions.length > 0,
                    };
                    break;
                  case 1:
                    data =
                      userType === 'patient'
                        ? {
                            title: 'Session History',
                            value: sessionHistory.length,
                          }
                        : {
                            title: 'Active Patients',
                            value: activePatients.length,
                          };
                    break;
                  case 2:
                    data = {
                      title: 'Messages',
                      value: userMessages.length,
                      new: userMessages?.messages
                        ? userMessages.messages.filter((x) => x.read).length > 0
                        : false,
                    };
                    break;
                  default:
                    data = null;
                }

                return (
                  <ActionCard item xs={12} sm={3} key={idx}>
                    <SpacedGridContainer>
                      <Grid item xs={10}>
                        <SpacedGridContainer spacing={2}>
                          <Grid item xs={12}>
                            <SpacedGridContainer justifyContent="space-between">
                              <Grid item>
                                <Typography align="left" variant="h5">
                                  {data?.title}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="h5">
                                  {data.new ? <NewChip /> : null}
                                </Typography>
                              </Grid>
                            </SpacedGridContainer>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h5">{data?.value}</Typography>
                          </Grid>
                        </SpacedGridContainer>
                      </Grid>
                    </SpacedGridContainer>
                  </ActionCard>
                );
              })}
            </SpacedGridContainer>
          </Grid>
        </SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
    </PageContainer>
  );
})`
  position: relative;
`;

export default DashboardPage;
