import {useSelector} from 'react-redux';
import {AsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '~/redux/root-reducer';
import {RequestState} from '~/utils/thunk-api/type';

export function useRequestState(thunkAction: AsyncThunk<any, any, any>): RequestState {
  const {firstPage, loading, error, errCode, contexts, lastRequestAt} = useSelector(
    (state: RootState) => state.ui[thunkAction.typePrefix] || {},
  );

  return {firstPage, loading, error, errCode, contexts, lastRequestAt};
}
