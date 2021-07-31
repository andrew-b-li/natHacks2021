import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Styling
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme.js';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import './App.css';

// Layouts
import MainLayout from 'components/layouts/MainLayout';

// Auth
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

// Contexts
import AppContextProvider from 'contexts/AppContext';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Components/Pages
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <StylesProvider injectFirst>
          <AppContextProvider>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Suspense fallback="loading">
                  <MainLayout>
                    <Switch>
                      <Route exact path="/" component={Landing} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                      />
                    </Switch>
                  </MainLayout>
                </Suspense>
              </ThemeProvider>
            </MuiThemeProvider>
          </AppContextProvider>
        </StylesProvider>
      </Router>
    </Provider>
  );
};

export default App;
