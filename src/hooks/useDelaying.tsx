import {useCallback, useState} from 'react';

export function useDelaying(initValue = false) {
  const [isDelaying, setIsDelaying] = useState(initValue);

  const startDelay = useCallback((delayTime = 2200) => {
    setIsDelaying(true);
    setTimeout(() => {
      setIsDelaying(false);
    }, delayTime);
  }, []);

  return {
    isDelaying,
    startDelay,
  };
}
