import React, { createContext, useEffect, useState, useCallback } from 'react';

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [mainLayoutOptions, setMainLayoutOptions] = useState(null);

  return (
    <AppContext.Provider
      value={{
        mainLayoutOptions,
        setMainLayoutOptions,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
