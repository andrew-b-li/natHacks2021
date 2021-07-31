import { createTheme, responsiveFontSizes } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { colors, easings, StylingFunctions } from 'config/extended_theme';

const theme = createTheme({
  _colors: { ...colors },
  _funcs: new StylingFunctions(),
  _easings: {
    ...easings,
  },
  palette: {
    // primary: { main: '#B5B0F6', contrastText: '#fff' },
    blue: { ...blue },
  },
  typography: {
    fontFamily: "'Quicksand', sans-serif",
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
