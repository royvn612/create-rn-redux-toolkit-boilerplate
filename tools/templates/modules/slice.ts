import {createEntityAdapter, createSlice, EntityId} from '@reduxjs/toolkit';
import {mapValues} from 'lodash';
import {__module__(pascalCase)Schema} from '~/redux/__module__(kebabCase)s/types';
import {RootState} from '~/redux/root-reducer';
import {ReducerState} from '~/utils/thunk-api/type';
import {add__module__(pascalCase), delete__module__(pascalCase), fetch__module__(pascalCase)s, update__module__(pascalCase)} from '~/redux/__module__(kebabCase)s/thunk';
import {addSuccess, createSelectAllBySource, deleteSuccess, fetchSuccess} from '~/utils/thunk-api';
import {DEFAULT_SOURCE_REDUCER_STATE} from '~/utils/thunk-api/constants';

/* Slice */
interface InitialState extends ReducerState {}

export const SOURCES___module__(constantCase) = {
  DEFAULT: 'DEFAULT',
};
const sources = mapValues(SOURCES___module__(constantCase), () => DEFAULT_SOURCE_REDUCER_STATE);

const __module__sAdapter = createEntityAdapter<__module__(pascalCase)Schema>();

const initialState = __module__sAdapter.getInitialState<InitialState>({sources});

// Slice
const __module__s = createSlice({
  name: '__module__s',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetch__module__(pascalCase)s.fulfilled, (state, {payload}) => {
      __module__sAdapter.upsertMany(state, payload.normalized.entities.__module__s || {});
      fetchSuccess(state, payload);
    });
    builder.addCase(add__module__(pascalCase).fulfilled, (state, {payload}) => {
      __module__sAdapter.upsertMany(state, payload.normalized.entities.__module__s || {});
      addSuccess(state, payload, [SOURCES___module__(constantCase).DEFAULT]);
    });
    builder.addCase(update__module__(pascalCase).fulfilled, (state, {payload}) => {
      __module__sAdapter.upsertMany(state, payload.normalized.entities.__module__s || {});
    });
    builder.addCase(delete__module__(pascalCase).fulfilled, (state, {payload}) => {
      __module__sAdapter.removeOne(state, payload.id as EntityId);
      deleteSuccess(state, payload);
    });
  },
});

// export const {} = __module__s.actions;

export default __module__s.reducer;

export const {
  selectById: select__module__(pascalCase)ById,
  selectIds: select__module__(pascalCase)sIds,
  selectEntities: select__module__(pascalCase)sEntities,
  selectAll: selectAll__module__(pascalCase)s,
  selectTotal: selectTotal__module__(pascalCase)s,
} = __module__sAdapter.getSelectors((state: RootState) => state.__module__s);

export const [get__module__(pascalCase)s] = createSelectAllBySource('__module__s', select__module__(pascalCase)sEntities, [
  SOURCES___module__(constantCase).DEFAULT,
]);
