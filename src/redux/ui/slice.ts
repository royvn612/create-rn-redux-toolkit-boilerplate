import {AnyAction, AsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RejectErrorValue, RequestState} from '~/utils/thunk-api/type';
import {DEFAULT_REQUEST_STATE} from '~/utils/thunk-api/constants';
import {MessageBag} from '~/redux/ui/types';

interface PendingReducer {
  meta?: {arg: {page?: number; [key: string]: any}};
  type: string;
}

interface RejectedReducer {
  payload?: RejectErrorValue;
  type: string;
}

type GenericAsyncThunk = AsyncThunk<any, any, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

interface InitialState {
  messageBag: MessageBag;
  lastRequestStatusCode?: number | string | undefined;
  [actionTypePrefix: string]: RequestState | any;
}

const initialState: InitialState = {
  lastRequestStatusCode: undefined,
  messageBag: {
    message: undefined,
    description: undefined,
    type: 'danger',
  },
};

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

// Slice
const ui = createSlice({
  name: 'uis',
  initialState,
  reducers: {
    notify(state, {payload}: PayloadAction<MessageBag>) {
      state.messageBag = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isPendingAction, (state, {meta, type}: PendingReducer) => {
      const typePrefix = type.replace('/pending', '');
      state[typePrefix] = state[typePrefix] || DEFAULT_REQUEST_STATE;
      state[typePrefix] = {
        ...state[typePrefix],
        loading: true,
        error: null,
        firstPage: (meta?.arg?.page || 0) <= 1,
      };
      state.messageBag = {};
    });
    builder.addMatcher(isFulfilledAction, (state, {type}) => {
      const typePrefix = type.replace('/fulfilled', '');
      state[typePrefix] = state[typePrefix] || DEFAULT_REQUEST_STATE;
      state[typePrefix] = {
        ...state[typePrefix],
        loading: false,
        error: null,
      };
      state.messageBag = {};
    });
    // @ts-ignore
    builder.addMatcher(isRejectedAction, (state, {payload, type}: RejectedReducer) => {
      const typePrefix = type.replace('/rejected', '');
      state[typePrefix] = state[typePrefix] || DEFAULT_REQUEST_STATE;
      state[typePrefix] = {
        ...state[typePrefix],
        loading: false,
        error: payload?.errMsg,
        errCode: payload?.errCode,
        errStatusCode: payload?.errStatusCode,
        contexts: payload?.contexts,
      };
      state.messageBag = {
        message: 'Error',
        description: payload?.errMsg,
        type: 'danger',
      };
      state.lastRequestStatusCode = payload?.errStatusCode;
    });
  },
});

export const {notify} = ui.actions;

export default ui.reducer;
