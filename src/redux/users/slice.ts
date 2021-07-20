import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {mapValues} from 'lodash';
import {UserSchema} from '~/redux/users/types';
import {RootState} from '~/redux/root-reducer';
import {ReducerState} from '~/utils/thunk-api/type';
import {fetchUserInfo, updateCurrentUser} from '~/redux/users/thunk';
import {fetchSuccess} from '~/utils/thunk-api';
import {DEFAULT_SOURCE_REDUCER_STATE} from '~/utils/thunk-api/constants';

/* Slice */
interface InitialState extends ReducerState {}
export const SOURCES_USER = {};

const sources = mapValues(SOURCES_USER, () => DEFAULT_SOURCE_REDUCER_STATE);

const usersAdapter = createEntityAdapter<UserSchema>();

const initialState = usersAdapter.getInitialState<InitialState>({
  sources,
  request: {},
});

// Slice
const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state, {payload}) => {
      const {normalized} = payload;
      usersAdapter.upsertMany(state, normalized.entities.users || {});
      fetchSuccess(state, payload);
    });
    builder.addCase(updateCurrentUser.fulfilled, (state, {payload}) => {
      usersAdapter.upsertMany(state, payload.normalized.entities.users || {});
    });
  },
});

// export const {} = users.actions;

export default users.reducer;

export const {
  selectById: selectUserById,
  selectIds: selectUsersIds,
  selectEntities: selectUsersEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state: RootState) => state.users);
