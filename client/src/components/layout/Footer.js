import React, { useContext, useEffect } from 'react';

// Styling
import { Box } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

const Footer = styled(({ ...props }) => {
  return <footer {...props}>&nbsp;</footer>;
})`
  /* Layout styles */
  width: 100%;
  min-height: 67px;
  background: ${(props) => props.theme._colors.brown};
  flex-shrink: 0;
`;

export default Footer;
