import React, { useContext, useEffect, useState, useCallback } from 'react';

// Styling
import { Box, Button, Grid, Slider, Typography } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Helpers
import {
  ClearBlock,
  GridContainer,
  PageContainer,
  SpacedGridContainer,
} from 'components/styles/global';

// Hooks
import useDidMountEffect from 'components/useDidMountEffect';

const Loader = styled(
  ({ loaded, children, loader = 'Loading...', ...props }) => {
    const [show, setShow] = useState(false);
    useDidMountEffect(() => {
      setShow(true);
    }, [loaded]);

    return <>{show ? children : loader}</>;
  }
)``;

export default Loader;
