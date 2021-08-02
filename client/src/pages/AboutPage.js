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


// #region with circles
const AP__RightColumn = styled(Grid)``;

const AP__FirstCircle = styled(GridContainer)`
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: #BCE7DF;
      position: fixed
  ;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(1100px, 50px, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 360px;
      max-height: 360px;
      border-radius: 50%;
    }
  }
`;
const MeetingImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1150px, -150px, 0);
  z-index: 0;
`;
const OneImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1000px, -200px, 0);
  z-index: 0;
`;
const FirstCircleText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: fixed;
  white-space: nowrap;
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: 0.1em;
  transform: translate3d(1030px, -330px, 0);
`;



const AP__SecondCircle = styled(GridContainer)`
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: #BCE7FD;
      position: fixed
  ;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(1480px, 120px, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 360px;
      max-height: 360px;
      border-radius: 50%;
    }
  }
`;
const BioImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1500px, -280px, 0);
  z-index: 0;
`;
const TwoImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1490px, -140px, 0);
  z-index: 0;
`;
const SecondCircleText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: fixed;
  white-space: nowrap;
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: 0.1em;
  transform: translate3d(1440px, -50px, 0);
`;



const AP__ThirdCircle = styled(GridContainer)`
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: #EFC6C0;
      position: fixed
  ;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(990px, 470px, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 360px;
      max-height: 360px;
      border-radius: 50%;
    }
  }
`;
const FeedbackImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(910px, 70px, 0);
  z-index: 0;
`;
const ThreeImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1110px, 140px, 0);
  z-index: 0;
`;
const ThirdCircleText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: fixed;
  white-space: nowrap;
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: 0.1em;
  transform: translate3d(1050px, 240px, 0);
`;



const AP__FourthCircle = styled(GridContainer)`
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: #00AFB9;
      position: fixed
  ;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(1500px, 525px, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 360px;
      max-height: 360px;
      border-radius: 50%;
    }
  }
`;
const ResearchImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1550px, 250px, 0);
  z-index: 0;
`;
const FourImage = styled(motion.img)`
  position: fixed;
  transform: translate3d(1400px, 160px, 0);
  z-index: 0;
`;
const FourthCircleText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: fixed;
  white-space: nowrap;
  color: #000000;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
  line-height: 30px;
  letter-spacing: 0.1em;
  transform: translate3d(1430px, 50px, 0);
`;


// #region with text
const AP__LeftColumn = styled(Grid)``;

const HeaderText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: absolute;
  color: #6D6D6D;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 54px;
  line-height: 62px;
  letter-spacing: 0.1em;
  transform: translate3d(-800px, -400px, 0);
`;

const HeaderTextColor = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: absolute;
  color: #5551FF;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 54px;
  line-height: 62px;
  letter-spacing: 0.1em;
  transform: translate3d(-800px, -400px, 0);
`;

const BodyText = styled((props) => <Typography {...props} />)`
  z-index: 1;
  position: absolute;
  color: #6D6D6D;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: 0.1em;
  transform: translate3d(-800px, -50px, 0);
`;


const AboutPage = styled(({ ...props }) => {
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // Set layout options (e.g. page title, dispaly header, etc.)
  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'neural.ly - neurofeedback from home.',
      hideHeader: true,
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
      <Grid item xs={11}>
        <SpacedGridContainer
          spacing={isSmall ? 4 : 0}
          direction={isSmall ? 'column' : 'row'}
        >

          <AP__RightColumn item xs={12} md={6}>
            <SpacedGridContainer
              alignItems="flex-start"
              direction="column"
              spacing={4}
            >
              <Grid item>
                <AP__FirstCircle>
                  <MeetingImage src={'img/meeting.svg'} />
                  <OneImage src={'img/1.svg'} />
                  <FirstCircleText align="center">
                    Patient takes <br />
                    headset home
                    <br />
                  </FirstCircleText>
                </AP__FirstCircle>
              </Grid>
              <Grid item>
                <AP__SecondCircle>
                  <BioImage src={'img/socialbiography.svg'} />
                  <TwoImage src={'img/2.svg'} />
                  <SecondCircleText align="center">
                    Patient and provider <br />
                    connect on neural.ly
                    <br />
                  </SecondCircleText>
                </AP__SecondCircle>
              </Grid>
              <Grid item>
                <AP__ThirdCircle>
                  <FeedbackImage src={'img/feedback.svg'} />
                  <ThreeImage src={'img/3.svg'} />
                  <ThirdCircleText align="center">
                    Patient attends feedback <br />
                    sessions from home
                    <br />
                  </ThirdCircleText>
                </AP__ThirdCircle>
              </Grid>
              <Grid item>
                <AP__FourthCircle>
                  <ResearchImage src={'img/researching.svg'} />
                  <FourImage src={'img/4.svg'} />
                  <FourthCircleText align="center">
                    Provider tracks <br />
                    progress online
                    <br />
                  </FourthCircleText>
                </AP__FourthCircle>
              </Grid>
            </SpacedGridContainer>
          </AP__RightColumn>
          <AP__LeftColumn item xs={12} md={6}>
            <SpacedGridContainer
                alignItems="flex-start"
                direction="column"
                spacing={4}
              >
              <Grid item>
                <HeaderTextColor align="left" variant="h4">
                  A dynamic web <br />
                  application that <br />
                  delivers neurofeedback <br />
                  therapies to your <br />
                  (virtual) doorstep <br />
                </HeaderTextColor>
              </Grid>
              <Grid item>
                <BodyText align="left" variant="h4">
                  Neurofeedback is a potent therapy with proven <br />
                  benefits for hard-to-treat conditions such as <br />
                  ADHD, OCD, and autism. However, due to the <br />
                  cost, lack of provider unavailability, and <br />
                  burden of multiple appointments, this <br />
                  promising technology remains inaccessible to <br />
                  those who need it most. <br />
                  <br />
                  neural.ly aims to bring neurofeedback to the <br />
                  patients by providing a platform for providers <br />
                  to prescribe sessions that can be completed by <br />
                  patients at home. With a focus on ease of use, <br />
                  modularity, and powerful analytics, neural.ly <br />
                  provides the home care experience <br />
                  that patients deserve. <br />
                  <br />
                  <br />  
                  Interested?&nbsp; 
                  <Link
                    to={userCtx?.auth?.isAuthenticated ? '/user/dashboard' : '/'}
                  >
                    Register now. <br />
                  </Link>
                </BodyText>
              </Grid>
            </SpacedGridContainer>
          </AP__LeftColumn>
        </SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
    </PageContainer>
  );
})``;

export default AboutPage;
