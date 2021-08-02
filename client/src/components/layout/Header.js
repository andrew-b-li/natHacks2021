import React, { useContext, useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@material-ui/core';

// Styling
import { Box } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import theme from 'config/theme';
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
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const HeaderNavButton = styled(Button)`
  color: #fff;
  cursor: pointer;
`;

const Header = styled(({ ...props }) => {
  const history = useHistory();
  const appCtx = useContext(AppContext);
  const [userCtx, userDispatch] = useContext(UserContext);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Hamburger menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                {userCtx?.auth?.isAuthenticated && !isSmall && (
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

                {userCtx?.auth?.isAuthenticated && isSmall && (
                  <>
                    <IconButton onClick={handleClick}>
                      <MenuIcon
                        css={`
                          color: #fff;
                        `}
                      />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={null}>
                        <NotificationsIcon />
                      </MenuItem>
                      <MenuItem onClick={() => history.push('/user/calendar')}>
                        <EventNoteIcon />
                      </MenuItem>
                      <MenuItem onClick={() => logoutUser(userDispatch)}>
                        <ExitToAppIcon />
                      </MenuItem>
                    </Menu>
                  </>
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
