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

const FooterLink = styled(Link)`
  color: white;
`;

const footer = styled(({ ...props }) => {
  return (
    <footer {...props}>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <FooterLink to="/about" color="inherit">
            About
          </FooterLink>
        </Grid>

        <Grid item>
          <FooterLink to="/" color="inherit">
            Contact Us
          </FooterLink>
        </Grid>

        <Grid item>
          <FooterLink to="/" color="inherit">
            Privacy
          </FooterLink>
        </Grid>

        <Grid item>
          <FormLabel
            css={`
              color: white;
            `}
          >
            neural.ly &copy; {new Date().getFullYear()}
          </FormLabel>
        </Grid>
      </Grid>
    </footer>
  );
})`
  /* Layout styles */
  width: 100%;
  min-height: 40px;
  background: ${(props) => props.theme._colors.brown};
  flex-shrink: 0;

  padding-top: 10px;
`;

export default footer;
