import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNotificationQueue } from 'contexts/NotificationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Grid } from '@material-ui/core';
import {
  defaultVariantMappings,
  FlexDivCenter,
  GridContainer,
  GridItem,
  MotionGrid,
  SpacedGridContainer,
} from 'components/styles/global';
import Typography from '@material-ui/core/Typography';
import { LinearProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

import styled, { css, keyframes } from 'styled-components';
import 'styled-components/macro';
import {
  darken,
  getLuminance,
  lighten,
  mix,
  rgba,
  readableColor,
} from 'polished';
import theme from 'config/theme';

import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import InfoIcon from '@material-ui/icons/Info';

import useDidMount from 'components/useDidMount';

const CustomAlert = styled(({ type, children, ...props }) => {
  const [alertIcon, setAlertIcon] = useState(<InfoIcon />);

  useEffect(() => {
    switch (type) {
      case 'error':
        setAlertIcon(<ErrorIcon />);
        break;
      case 'warning':
        setAlertIcon(<WarningIcon />);
        break;
      case 'success':
        setAlertIcon(<CheckCircleIcon />);
        break;
      case 'question':
        setAlertIcon(<HelpIcon />);
        break;
      case 'info':
      default:
        setAlertIcon(<InfoIcon />);
        break;
    }
  }, [type]);

  return (
    <>
      {alertIcon && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          {...props}
        >
          <Grid item xs={12}>
            <SpacedGridContainer spacing={2}>
              <GridItem alignSelf="center" xs={2}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  // alignItems="flex-end"
                >
                  {alertIcon}
                </Box>
              </GridItem>
              <Grid item xs={10}>
                {children}
              </Grid>
            </SpacedGridContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
})`
  z-index: ${(props) => props.theme.zIndex.snackbar};
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  padding: ${(props) => props.theme.spacing(2)}px;
  ${(props) =>
    props.type &&
    ((props) => {
      let res = [];
      let bg = null;
      let color = props.theme._colors.grey;
      switch (props.type) {
        case 'error':
          bg = props.theme._colors.red;
          // color = props.theme._colors.dark3;
          res.push(css`
            background-color: ${bg};
          `);
          break;
        case 'warning':
          bg = props.theme._colors.yellow;
          res.push(css`
            background-color: ${bg};
          `);
          break;
        case 'success':
          bg = props.theme._colors.green;
          res.push(css`
            background-color: ${bg};
          `);
          break;
        case 'question':
          bg = props.theme._colors.lightblue;
          res.push(css`
            background-color: ${bg};
          `);
          break;
        case 'info':
        default:
          bg = props.theme._colors.iris;
          res.push(css`
            background-color: ${bg};
          `);
          break;
      }
      if (!color)
        color = readableColor(
          bg,
          props.theme._colors.silver,
          props.theme._colors.grey3
        );
      res.push(
        css`
          color: ${color};
        `
      );
      res.push(
        props.theme._funcs.card({
          variant: 'paper-1',
          bg: bg,
          br: 5,
        })
      );
      return res;
    })(props)}
`;

const notificationAnimations = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1, ease: theme._easings.default },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, ease: theme._easings.default },
  },
};

const NotificationMessageText = styled(({ ...props }) => (
  <Typography variant="h6" align="left" {...props} />
))``;

const Notification = styled(
  ({ id, data, queue, autoHideDuration, ...props }) => {
    const autoHideDurationMS = autoHideDuration
      ? autoHideDuration * 1000
      : null;

    useEffect(() => {
      if (typeof autoHideDuration === 'number') {
        const autoHide = setTimeout(() => {
          queue.remove(id);
        }, autoHideDurationMS);
        return () => {
          clearTimeout(autoHide);
        };
      }
    }, []);

    return (
      <MotionGrid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        variants={notificationAnimations}
        {...defaultVariantMappings}
        {...props}
      >
        <CustomAlert type={data.type || 'info'}>
          <SpacedGridContainer spacing={1} justifyContent="flex-start">
            <Grid item>
              {data.messageComponent ? (
                data.messageComponent
              ) : (
                <NotificationMessageText>
                  {data.message}
                </NotificationMessageText>
              )}
            </Grid>
          </SpacedGridContainer>
        </CustomAlert>
      </MotionGrid>
    );
  }
)``;

const NotificationList = styled((props) => {
  const queue = useNotificationQueue();

  return (
    <MotionGrid
      container
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <AnimatePresence>
        {queue.entries.map(({ id, data }, idx) => {
          return (
            <Notification
              key={idx}
              {...{ id, data, queue, autoHideDuration: data.timeout ?? 60 }}
            />
          );
        })}
      </AnimatePresence>
    </MotionGrid>
  );
})`
  height: auto;
  width: 100%;
  z-index: ${(props) => props.theme.zIndex.snackbar};
  position: fixed;
  top: 0;
  left: 0;
`;

export default NotificationList;
