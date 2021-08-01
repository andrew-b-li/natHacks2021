import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from 'contexts/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userCtx, dispatch] = useContext(UserContext);

  return (
    userCtx.auth && (
      <>
        <Route
          {...rest}
          render={(props) =>
            userCtx.auth.isAuthenticated === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </>
    )
  );
};

export default PrivateRoute;
