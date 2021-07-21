import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {mapValues} from 'lodash';
import {AuthModel, AuthSchema} from '~/redux/auth/types';
import {RootState} from '~/redux/root-reducer';
import {ReducerState} from '~/utils/thunk-api/type';
import {UserSchema} from '~/redux/users/types';
import {fetchSuccess} from '~/utils/thunk-api';
import {fetchUserInfo, updateCurrentUser} from '~/redux/users/thunk';
import {DEFAULT_SOURCE_REDUCER_STATE} from '~/utils/thunk-api/constants';

/* Slice */
interface InitialState extends ReducerState {
  currentUser?: UserSchema;
  token?: string;
}

export const SOURCES_AUTH = {};

const sources = mapValues(SOURCES_AUTH, () => DEFAULT_SOURCE_REDUCER_STATE);

const authsAdapter = createEntityAdapter<AuthSchema>();

const initialState = authsAdapter.getInitialState<InitialState>({
  sources,
  request: {},
  currentUser: {} as UserSchema,
  token: undefined,
});

// Slice
const auths = createSlice({
  name: 'auths',
  initialState,
  reducers: {
    setCurrentUser(state, {payload}: PayloadAction<AuthModel>) {
      if (payload.user) {
        state.currentUser = {...state.currentUser, ...payload.user};
      }
      if (payload.token !== undefined) {
        state.token = payload.token;
      }
    },
    removeCurrentUser(state) {
      state.currentUser = initialState.currentUser;
      state.token = initialState.token;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state, {payload}) => {
      const {normalized} = payload;
      state.currentUser = {...state.currentUser, ...normalized.entities.users[normalized.result]};
      fetchSuccess(state, payload);
    });
    builder.addCase(updateCurrentUser.fulfilled, (state, {payload}) => {
      const {normalized} = payload;
      state.currentUser = {...state.currentUser, ...normalized.entities.users[normalized.result]};
    });
  },
});

export const {setCurrentUser} = auths.actions;

export default auths.reducer;

export const {
  selectById: selectAuthById,
  selectIds: selectAuthsIds,
  selectEntities: selectAuthsEntities,
  selectAll: selectAllAuths,
  selectTotal: selectTotalAuths,
} = authsAdapter.getSelectors((state: RootState) => state.auth);
