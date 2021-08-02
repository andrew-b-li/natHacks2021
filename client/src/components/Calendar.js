import React, { useContext, useEffect, useState, useCallback } from 'react';

// Styling
import {
  Box,
  Button,
  Divider,
  Grid,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import theme from 'config/theme';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Helpers
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import * as H from 'utils/helpers';
import {
  GridContainer,
  GridContainerBox,
  SpacedGridContainer,
} from './styles/global';

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Calendar = styled(
  ({ events, selectable, onSelectEvent, className, ...props }) => {
    const currDate = moment();
    const currMonth = moment().month();
    const currDay = moment().day();
    const currYear = moment().year();

    const [daysOfMonth, setDaysOfMonth] = useState(
      H.getDaysArray(currYear, currMonth)
    );
    const daysOfMonthInChunks = H.groupByN(7, daysOfMonth);
    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    //   console.log(daysOfMonth);

    return (
      <SpacedGridContainer justifyContent="space-evenly" className={className}>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()}
          defaultView="month"
          views={['month', 'day', 'week']}
          selectable={selectable}
          onSelectEvent={onSelectEvent}
          onSelectSlot={({ start, end, slots, action, bounds, box }) => {
            console.log(slots);
          }}
          css={`
            height: 80vh;
            width: 100%;
          `}
        />
      </SpacedGridContainer>
    );
  }
)`
  .rbc-toolbar {
    flex-wrap: nowrap;
    ${(props) => props.theme.breakpoints.down('sm')} {
      .rbc-btn-group:first-of-type {
        display: none;
      }
    }
  }
`;

export default Calendar;
