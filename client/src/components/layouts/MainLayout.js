import React from 'react';
import { useContext, useEffect } from 'react';

// Styling
import { Box } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Contexts
import { AppContext } from 'contexts/AppContext';

// Helpers
import { docReady, checkVisible } from 'utils/helpers';

const MainSection = styled.section`
  height: 100%;
`;

const MainDiv = styled.main`
  height: 100%;
`;

const MainLayout = ({ pageTitle, layoutOptions, children }) => {
  const appCtx = useContext(AppContext);
  if (appCtx.mainLayoutOptions && !layoutOptions)
    layoutOptions = appCtx.mainLayoutOptions;

  useEffect(() => {
    if (layoutOptions?.pageTitle) document.title = layoutOptions.pageTitle;
    if (pageTitle) document.title = pageTitle;
  }, [layoutOptions?.pageTitle, appCtx.mainLayoutOptions, pageTitle]);

  return (
    <MainSection>
      <MainDiv>{children}</MainDiv>
    </MainSection>
  );
};

export default MainLayout;
