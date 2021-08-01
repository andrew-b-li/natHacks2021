import React, { Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

// Styling
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme.js';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import './App.css';

// Layouts
import MainLayout from 'components/layout/MainLayout';

// Contexts
import AppContextProvider from 'contexts/AppContext';
import UserContextProvider from 'contexts/UserContext';
import { NotificationProvider } from 'contexts/NotificationsContext';

// Components/Pages
import LandingPage from './pages/LandingPage';
import SignUpPage from 'pages/SignUpPage';
import DashboardPage from 'pages/DashboardPage';
// import Login from './components/auth/Login';
// import Register from './components/auth/Register';

// Other
import PrivateRoute from './components/private-route/PrivateRoute';
import { AnimatePresence, motion } from 'framer-motion';
import { defaultVariantMappings } from 'components/styles/global';

const pageTransitionAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: theme._easings.default },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 1, ease: theme._easings.default },
  },
};

const AnimatedRoute = ({ privateRoute = false, ...props }) => {
  return (
    <motion.div {...defaultVariantMappings} variants={pageTransitionAnimation}>
      {privateRoute ? <PrivateRoute {...props} /> : <Route {...props} />}
    </motion.div>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <StylesProvider injectFirst>
      <AppContextProvider>
        <NotificationProvider>
          <UserContextProvider>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Suspense fallback="loading">
                  <MainLayout>
                    <AnimatePresence exitBeforeEnter>
                      <Switch location={location} key={location.pathname}>
                        <AnimatedRoute exact path="/" component={LandingPage} />
                        <AnimatedRoute
                          exact
                          path="/signup"
                          component={SignUpPage}
                        />
                        <AnimatedRoute
                          privateRoute
                          exact
                          path="/user/dashboard"
                          component={DashboardPage}
                        />
                      </Switch>
                    </AnimatePresence>
                  </MainLayout>
                </Suspense>
              </ThemeProvider>
            </MuiThemeProvider>
          </UserContextProvider>
        </NotificationProvider>
      </AppContextProvider>
    </StylesProvider>
  );
};

export default App;
