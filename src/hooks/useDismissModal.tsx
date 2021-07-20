import {useCallback} from 'react';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

export function useDismissModal(timeout = 100) {
  const {dismissAll} = useBottomSheetModal();
  // https://github.com/gorhom/react-native-bottom-sheet/issues/191
  // https://github.com/gorhom/react-native-bottom-sheet/issues/204
  // Because of above issue, we'll wait for component completed re-render then dismiss our modal after that
  const delayedDismissAll = useCallback(
    () =>
      setTimeout(() => {
        try {
          dismissAll();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }, timeout),
    [timeout, dismissAll],
  );

  return {
    dismissAll: delayedDismissAll,
  };
}
