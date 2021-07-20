import {Paginator, ReducerState, RequestState, SourceReducerState} from '~/utils/thunk-api/type';

export const DEFAULT_PAGINATOR: Paginator = {
  page: 1,
  current_page: 1,
  item_from: 0,
  item_to: 0,
  limit: 100,
  next_page: 0,
  previous_page: 0,
  total_items: 0,
  total_pages: 0,
};

export const DEFAULT_REQUEST_STATE: RequestState = {
  firstPage: undefined,
  loading: undefined,
  error: undefined,
  errCode: undefined,
  contexts: undefined,
  lastRequestAt: undefined,
};

export const DEFAULT_REDUCER_STATE: ReducerState = {
  allIds: [],
  paginator: DEFAULT_PAGINATOR,
  sources: {},
};

export const DEFAULT_SOURCE_REDUCER_STATE: SourceReducerState = {
  allIds: [],
  paginator: DEFAULT_PAGINATOR,
};
