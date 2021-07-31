import React, { useEffect, useRef } from 'react';

const useDidMount = (cb) => {
  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      cb();
    }
    // else {
    //     // do componentDidUpdate logic
    // }
  });
};

export default useDidMount;
