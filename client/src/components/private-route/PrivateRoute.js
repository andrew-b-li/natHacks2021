import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from 'contexts/UserContext';
import Loader from 'components/layout/Loader';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userCtx, dispatch] = useContext(UserContext);
  const [loadingState, setLoadingState] = useState(0); // 0 -> loading, 1 -> authenticated, -1 -> not authenticated

  useEffect(() => {
    // console.log(userCtx.auth);
    if (userCtx.auth.isAuthenticated && !userCtx.auth.loading)
      setLoadingState(1);
    if (!userCtx.auth.isAuthenticated && !userCtx.auth.loading)
      setLoadingState(-1);
  }, [userCtx.auth.isAuthenticated, userCtx.auth.loading]);

  // return (
  //   userCtx.auth && (
  //     <>
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           userCtx.auth.isAuthenticated === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/" />
  //           )
  //         }
  //       />
  //     </>
  //   )
  // );

  if (loadingState === 0) return <Loader />;
  if (loadingState === 1)
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  if (loadingState === -1) return <Redirect to="/" />;

  // if (userCtx.) return 'Loading...';
  // if (userCtx.auth.isAuthenticated) return <Route {...rest} />;
  // return <Redirect to="/" />;
};

export default PrivateRoute;
