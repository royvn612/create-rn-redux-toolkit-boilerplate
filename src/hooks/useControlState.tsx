import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export function useControlState<S>(initState: S | (() => S), observable?: S): [S, Dispatch<SetStateAction<S>>, boolean] {
  const [state, setState] = useState<S>(initState);
  useEffect(() => {
    if (observable !== undefined) {
      setState(observable);
    }
  }, [observable]);
  const isAutoControl = observable === undefined;

  return [state, setState, isAutoControl];
}
