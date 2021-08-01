import React from 'react';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import { Box } from '@material-ui/core';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Contexts
import { AppContext } from 'contexts/AppContext';
import { UserContext } from 'contexts/UserContext';

// Helpers
import { docReady, checkVisible } from 'utils/helpers';
import NotificationList from './NotificationList';

// Auth
import jwt_decode from 'jwt-decode';
import setAuthToken from 'utils/setAuthToken';
import { setCurrentUser, logoutUser } from 'actions/authActions';
import useDidMount from 'components/useDidMount';

// Components
import Header from './Header';
import usePrevious from 'components/usePrevious';
import useDidMountEffect from 'components/useDidMountEffect';
import Footer from './Footer';

const MainSection = styled.section`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const MainDiv = styled.main`
  height: 100%;
  flex-grow: 1;
  > div:first-child {
    min-height: 100vh;
  }
`;

const MainLayout = ({ pageTitle, layoutOptions, children }) => {
  const history = useHistory();
  const appCtx = useContext(AppContext);
  const [userCtx, userDispatch] = useContext(UserContext);

  if (appCtx.mainLayoutOptions && !layoutOptions)
    layoutOptions = appCtx.mainLayoutOptions;

  useEffect(() => {
    if (layoutOptions?.pageTitle) document.title = layoutOptions.pageTitle;
    if (pageTitle) document.title = pageTitle;
  }, [layoutOptions?.pageTitle, appCtx.mainLayoutOptions, pageTitle]);

  // Logout
  useEffect(() => {
    if (userCtx.auth.awaitingLogout) {
      userDispatch({ type: 'LOGOUT_COMPLETE' });
      history.push('/');
    }
  }, [userCtx.auth.awaitingLogout]);

  // Check if user is authenticated
  useEffect(() => {
    userDispatch({ type: 'USER_DATA_REQUEST' });
    // Check for token to keep user logged in
    if (localStorage.jwtToken && userCtx) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);

      try {
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);

        // Set user and isAuthenticated
        userDispatch({
          type: 'USER_DATA_SUCCESS',
          payload: decoded,
        });

        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds

        if (decoded.exp < currentTime) {
          // Logout user
          logoutUser(userDispatch);

          // Redirect to landing/login page
          // history.push('/');
        }
      } catch (err) {
        logoutUser(userDispatch);
      }
    } else {
      userDispatch({ type: 'USER_DATA_FAIL' });
    }
  }, [userCtx.auth.isAuthenticated]);

  return (
    <MainSection>
      <NotificationList />
      {layoutOptions && !layoutOptions.hideHeader && <Header />}
      <MainDiv>{children}</MainDiv>
      <Footer />
    </MainSection>
  );
};

export default MainLayout;
