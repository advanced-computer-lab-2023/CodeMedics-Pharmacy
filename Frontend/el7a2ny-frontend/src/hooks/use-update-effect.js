import { useEffect, useRef } from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export const useUpdateEffect = (effect, dependencies = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies);
};
