import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';

// Styling
import { Box } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

import {
  GridContainer,
  Link,
  Logo,
  SpacedGridContainer,
} from 'components/styles/global';

import { logoutUser } from 'actions/authActions';

import { UserContext } from 'contexts/UserContext';
import { AppContext } from 'contexts/AppContext';

// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useHistory } from 'react-router-dom';

const HeaderNavButton = styled(Button)`
  color: #fff;
  cursor: pointer;
`;

const Header = styled(({ ...props }) => {
  const history = useHistory();
  const appCtx = useContext(AppContext);
  const [userCtx, userDispatch] = useContext(UserContext);

  return (
    <AppBar position="sticky" {...props}>
      <Toolbar>
        <GridContainer>
          <Grid item xs={11}>
            <SpacedGridContainer justifyContent="space-between">
              {/* <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton> */}
              <Grid item>
                <Link
                  to={userCtx?.auth?.isAuthenticated ? '/user/dashboard' : '/'}
                >
                  <Logo
                    align="center"
                    variant={'h3'}
                    noWrap
                    css={`
                      color: white;
                    `}
                  />
                </Link>
              </Grid>
              <Grid item>
                {userCtx?.auth?.isAuthenticated && (
                  <SpacedGridContainer justifyContent="space-evenly">
                    <Grid item>
                      <HeaderNavButton onClick={() => null}>
                        <NotificationsIcon />
                      </HeaderNavButton>
                    </Grid>
                    <Grid item>
                      <HeaderNavButton
                        onClick={() => history.push('/user/calendar')}
                      >
                        <EventNoteIcon />
                      </HeaderNavButton>
                    </Grid>
                    <Grid item>
                      <HeaderNavButton onClick={() => logoutUser(userDispatch)}>
                        <ExitToAppIcon />
                      </HeaderNavButton>
                    </Grid>
                  </SpacedGridContainer>
                )}
              </Grid>
            </SpacedGridContainer>
          </Grid>
        </GridContainer>
      </Toolbar>
    </AppBar>
  );
})`
  background-color: ${(props) => props.theme._colors.brown};
  .MuiAppBar-colorPrimary {
  }
`;

export default Header;
