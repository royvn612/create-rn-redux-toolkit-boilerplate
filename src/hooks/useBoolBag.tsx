import {useState} from 'react';

export function useBoolBag(initState: {[key: string]: boolean} = {}) {
  const [bag, setBag] = useState(initState);

  const toggleBoolBag = (item: string) => {
    const newBag = {
      ...bag,
      [item]: !bag[item],
    };
    setBag(newBag);
  };

  const setBoolBag = (item: {[key: string]: boolean}) => {
    setBag({...bag, ...item});
  };
  return {boolBag: bag, toggleBoolBag, setBoolBag};
}
