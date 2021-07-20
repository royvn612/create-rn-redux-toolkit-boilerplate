import {useEffect, useRef} from 'react';
import {isEqual} from 'lodash';

export function useDeepEffect(fn: () => void, deps: any) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj: any, index: any) => isEqual(obj, deps[index]));

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, [deps, fn]);
}

export default useDeepEffect;
