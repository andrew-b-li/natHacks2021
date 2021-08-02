import { createTheme, responsiveFontSizes } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { colors, easings, StylingFunctions } from 'config/extended_theme';

// Styling
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

const theme = createTheme({
  _colors: { ...colors },
  _funcs: new StylingFunctions(),
  _easings: {
    ...easings,
  },
  palette: {
    // primary: { main: '#B5B0F6', contrastText: '#fff' },
    blue: { ...blue },
    text: { primary: colors.text, secondary: colors.textgrey },
    primary: {
      light: colors.lightblue,
      main: colors.blue,
      dark: darken(0.2, colors.blue),
      contrastText: '#fff',
    },
    secondary: {
      light: lighten(0.2, colors.iris),
      main: colors.iris,
      dark: darken(0.2, colors.iris),
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Lato', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {
    MuiButton: {
      root: {},
    },
  },
  props: {
    MuiButton: {
      //   disableRipple: true,
    },
  },
});

export default responsiveFontSizes(theme);
