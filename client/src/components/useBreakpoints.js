import { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import theme from '../config/theme';
import useDidMountEffect from './useDidMountEffect';

const useBreakpoints = (props) => {
  const verbose = props?.verbose;
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  const isLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isXl = useMediaQuery(theme.breakpoints.down('xl'));

  const screenSizes = { isXs, isSm, isMd, isLg, isXl };
  const [screenSize, setScreenSize] = useState(null);

  useDidMountEffect(() => {
    const currentScreenSize = Object.keys(screenSizes)
      .map((k) => (screenSizes[k] ? k : null))
      .filter((x) => x)[0]
      .substring(2)
      .toLowerCase();
    setScreenSize(currentScreenSize);
    if (verbose == true)
      console.log(
        'current screen size ------------------',
        currentScreenSize,
        '------------------'
      );
    return () => {
      return true;
    };
  }, [isXs, isSm, isMd, isLg, isXl]);

  if (screenSize) return screenSize;
};

export default useBreakpoints;
