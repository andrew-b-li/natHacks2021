import React, { createContext, useReducer } from 'react';
import { authReducer as auth } from 'reducers/authReducers';
import { combineReducers } from 'utils/helpers';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const initUserState = {
    auth: { isAuthenticated: false, userData: null },
  };
  const userReducer = combineReducers({
    auth,
  });
  const [userState, dispatch] = useReducer(userReducer, initUserState);
  const store = React.useMemo(() => [userState, dispatch], [userState]);

  return (
    <UserContext.Provider value={store}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
