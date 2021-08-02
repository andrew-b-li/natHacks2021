import React, { useContext, useEffect } from 'react';

// Styling
import {
  Box,
  Button,
  Divider,
  Grid,
  Container,
  AppBar,
  IconButton,
  Toolbar,
  Slider,
  TextField,
  Typography,
  Paper,
  useMediaQuery,
} from '@material-ui/core';

// Helpers
import {
  ClearBlock,
  GridContainer,
  GridItem,
  Link,
  PageContainer,
  SpacedGridContainer,
} from 'components/styles/global';

import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

const FormLabel = styled(Typography)`
  color: #5551ff;
  font-weight: 500;
`;

const footer = styled(({ ...props }) => {
  
  
  return (
    <footer {...props}>
      <Box>
        <Container maxWidth='lg'>
          <Grid container justify='flex-end' alignItems='flex-end'>
            <Grid item>
              <Paper>
              <Box width={77} height={10} p={3}>
                <Link href="/" color="inherit">
                  About
                </Link>
              </Box>
              </Paper>
            </Grid>
            <Grid item>
              <Box width={100} height={10} p={3}>
                <Link href="/" color="inherit">
                  Contact Us
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box width={100} height={10} p={3}>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Container maxWidth='lg'>
          <Grid container justify='flex-start' alignItems='flex-start'>
            <Grid item>
              <Paper>
              <FormLabel>
                neural.ly &reg; {new Date().getFullYear()}
              </FormLabel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>

  );
})`
  /* Layout styles */
  width: 100%;
  min-height: 40px;
  background: ${(props) => props.theme._colors.brown};
  flex-shrink: 0;
`;

export default footer;
