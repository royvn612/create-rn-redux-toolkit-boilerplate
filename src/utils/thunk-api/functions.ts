import {createSelector} from '@reduxjs/toolkit';
import {without} from 'lodash';
import {NormalizedPayload, ReducerState} from '~/utils/thunk-api/type';
import {DEFAULT_SOURCE_REDUCER_STATE} from '~/utils/thunk-api/constants';
import {RootState} from '~/redux/root-reducer';
import {ensureSafeChaining} from '~/utils/helpers';

const fetchSuccess = (
  state: ReducerState,
  payload: NormalizedPayload<any>,
  options?: {
    entityName: string;
    sortComparer: (a: any, b: any) => number;
  },
) => {
  const {source, normalized, paginator, ...rest} = payload;
  let allIds = normalized.result;
  if (options?.sortComparer && normalized.entities[options.entityName]) {
    allIds = Object.values(normalized.entities[options.entityName])
      .sort(options.sortComparer)
      .map((item: any) => item.id);
  }

  if (source) {
    ensureSafeChaining(state, ['sources', source], DEFAULT_SOURCE_REDUCER_STATE);
    state.sources[source] = {
      ...state.sources[source],
      paginator,
      allIds,
      ...rest,
    };
  }
};

const deleteSuccess = (state: ReducerState, payload: any) => {
  Object.keys(state.sources).forEach(stateKey => {
    state[stateKey].allIds = without(state[stateKey].allIds, payload.id);
  });
};

const addSuccess = (state: ReducerState, payload: any, sources: string[]) => {
  sources.forEach(source => {
    if (payload?.normalized?.result) {
      ensureSafeChaining(state, ['sources', source, 'allIds'], []);
      state.sources[source].allIds!.unshift(payload?.normalized?.result);
    }
  });
};

const requestOK = (result: any, action: any) => action.fulfilled.match(result);

const requestFailed = (result: any, action: any) => action.rejected.match(result);

const createSelectAllBySource = (subStateName: keyof RootState, selectEntities: any, sources: string[]) =>
  sources.map(source =>
    createSelector(
      // @ts-ignore
      [selectEntities, (state: RootState) => state[subStateName].sources[source] || DEFAULT_SOURCE_REDUCER_STATE],
      (entities: any, {allIds = [], ...rest}) => ({
        data: allIds.map((id: number) => entities[id]),
        ...rest,
      }),
    ),
  );

export {fetchSuccess, deleteSuccess, addSuccess, requestOK, requestFailed, createSelectAllBySource};
