import { useEffect, useRef } from 'react';
// import usePrevious from 'components/usePrevious';
import deep_diff from 'deep-diff';

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
          diff: deep_diff.diff(previousDeps[index], dependency),
        },
      };
    }

    return accum;
  }, {});

  if (
    Object.keys(changedDeps).length &&
    Object.keys(changedDeps).filter((x) => changedDeps[x] == 'diff').length > 0
  ) {
    console.log('----------[use-effect-debugger] ', changedDeps);
  }

  useEffect(effectHook, dependencies);
};

export default useEffectDebugger;
