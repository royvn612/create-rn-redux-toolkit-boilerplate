import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AsyncThunk} from '@reduxjs/toolkit';
import {NormalizedSchema} from 'normalizr';
import {AppDispatch} from '~/redux/root-store';
import {RootState} from '~/redux/root-reducer';

export interface OnSuccess<ResponseBody, Return, Params> {
  ({
    responseBody,
    returnPayload,
    params,
    dispatch,
    getState,
  }: {
    responseBody?: ResponseBody;
    returnPayload?: Return;
    params?: Params;
    dispatch?: AppDispatch;
    getState?: () => RootState;
  }): any;
}

export interface Callbacks<ResponseBody, Return, Params> {
  onSuccess: OnSuccess<ResponseBody, Return, Params>;
}

export interface SourceReducerState {
  allIds?: any[];
  paginator?: Paginator;
  [key: string]: any;
}

export interface ReducerState {
  allIds?: any[];
  paginator?: Paginator;
  sources: Record<string, SourceReducerState>;

  [key: string]: any;
}

export interface ThunkOptions {
  requestConfig?: AxiosRequestConfig;
  isCallApiOnly?: boolean;
  withoutNormalize?: boolean;
  isSnakeCase?: boolean;
  urlPlaceholders?: string[];
  includeApiResponseData?: boolean;
  restfulMethod?: 'post' | 'put' | 'delete';
}

export type ThunkResult<Entities, Params> = AsyncThunk<
  NormalizedPayload<Entities>,
  Params,
  {dispatch: AppDispatch; rejectValue: RejectErrorValue}
>;
export type ThunkRawResult<ApiResponseData, Params> = AsyncThunk<ApiResponseData, Params, {}>;
export type AxiosResult<D, Params> = (arg: Params) => Promise<ApiResponse<D>>;

export interface RejectErrorValue {
  errMsg: string;
  errCode?: string | number | undefined;
  errStatusCode?: string | number | undefined;
  contexts?: {[key: string]: any} | undefined;
}

export interface RequestState {
  firstPage?: boolean;
  loading?: boolean;
  error?: string | null;
  errCode?: string | number | undefined;
  contexts?: {[key: string]: any} | undefined;
  lastRequestAt?: number;
}

export interface BaseRequest {
  source?: string;

  [key: string]: any;
}

export interface PostParams extends BaseRequest {
  data: Record<string, any> | Record<string, any>[];
}

export interface PutParams extends BaseRequest {
  id?: string | number;
  data: any;
}

export interface DeleteParams extends BaseRequest {
  id: string | number;
}

export interface FetchParams extends BaseRequest {
  cacheIn?: number;
  page?: number;
  limit?: number;
  loadMore?: boolean;
  urlPlaceholders?: string[];
}

export interface BasePayload {
  source?: string;
}

export interface NormalizedPayload<T, R = any | any[], ApiResponseData = any> extends BasePayload {
  normalized: NormalizedSchema<T, R>;
  apiResponseData?: ApiResponseData;
  loadMore?: boolean;
  paginator?: Paginator;
}

export interface DeletedPayload extends BasePayload {
  id?: string | number;
}

export interface Paginator {
  page: number; // Several BE returns page instead of current_page
  current_page: number;
  item_from: number;
  item_to: number;
  limit: number;
  next_page: number | null;
  previous_page: number | null;
  total_items: number;
  total_pages: number;
}

export interface ApiResponse<Data> extends AxiosResponse {
  data: {
    status_code?: number;
    message: string;
    data: Data;
    paginator?: Paginator;
    status: string;
    side_data?: Record<string, any>;
  };
}

export type GenericApiResponseData<Model, IsArray = undefined> = IsArray extends true ? Model[] : Model;
