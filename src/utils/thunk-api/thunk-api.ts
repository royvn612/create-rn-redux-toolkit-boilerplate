import {createAsyncThunk} from '@reduxjs/toolkit';
import {normalize, Schema} from 'normalizr';
import {isArray, isBoolean, isEmpty} from 'lodash';
import AppError from '~/utils/error-handler';
import {parseFormDataToObj, serializeQueryString, snakeCaseObj} from '~/utils/helpers/functions';
import request from '~/utils/request';
import {AppDispatch} from '~/redux/root-store';
import {RootState} from '~/redux/root-reducer';
import {
  ApiResponse,
  AxiosResult,
  BaseRequest,
  Callbacks,
  DeleteParams,
  FetchParams,
  GenericApiResponseData,
  NormalizedPayload,
  PostParams,
  PutParams,
  RejectErrorValue,
  ThunkOptions,
  ThunkRawResult,
  ThunkResult,
} from '~/utils/thunk-api/type';

export class ThunkApi<Model, Entities> {
  namespace: string;

  schemaEntity: Schema;

  isSnakeCase: boolean;

  constructor(namespace: string, schemaEntity: Schema) {
    this.namespace = namespace;
    this.schemaEntity = schemaEntity;
    this.isSnakeCase = false;
  }

  fetchOne<Params extends FetchParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {withoutNormalize: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkRawResult<ApiResponseData, Params>;
  fetchOne<Params extends FetchParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {isCallApiOnly: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): AxiosResult<ApiResponseData, Params>;
  fetchOne<Params extends FetchParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  fetchOne<Params extends FetchParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  fetchOne<Params extends FetchParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return this.fetchRequest<Params, ApiResponseData>(endpoint, prefix ? `${prefix}/fetchOne` : 'fetchOne', options, callbacks);
  }

  fetch<Params extends FetchParams, IsArray = true, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {withoutNormalize: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkRawResult<ApiResponseData, Params>;
  fetch<Params extends FetchParams, IsArray = true, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {isCallApiOnly: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): AxiosResult<ApiResponseData, Params>;
  fetch<Params extends FetchParams, IsArray = true, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  fetch<Params extends FetchParams, IsArray = true, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  fetch<Params extends FetchParams, IsArray = true, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return this.fetchRequest<Params, ApiResponseData>(endpoint, prefix ? `${prefix}/fetchMany` : 'fetchMany', options, callbacks);
  }

  post<Params extends PostParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {withoutNormalize: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkRawResult<ApiResponseData, Params>;
  post<Params extends PostParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {isCallApiOnly: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): AxiosResult<ApiResponseData, Params>;
  post<Params extends PostParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  post<Params extends PostParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  post<Params extends PostParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return this.postRequest<Params, ApiResponseData>(
      endpoint,
      prefix ? `${prefix}/post` : 'post',
      {...options, restfulMethod: 'post'},
      callbacks,
    );
  }

  put<Params extends PutParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {withoutNormalize: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkRawResult<ApiResponseData, Params>;
  put<Params extends PutParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options: ThunkOptions & {isCallApiOnly: true},
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): AxiosResult<ApiResponseData, Params>;
  put<Params extends PutParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  put<Params extends PutParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params>;
  put<Params extends PutParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params> | AxiosResult<ApiResponseData, Params> | ThunkRawResult<ApiResponseData, Params> {
    return this.postRequest<Params, ApiResponseData>(
      endpoint,
      prefix ? `${prefix}/put` : 'put',
      {...options, restfulMethod: 'put'},
      callbacks,
    );
  }

  delete = <Params extends DeleteParams, IsArray = false, ApiResponseData = GenericApiResponseData<Model, IsArray>>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) => {
    const deletePrefix = prefix ? `${this.namespace}/${prefix}/delete` : `${this.namespace}/delete`;
    return this.createAsyncThunkAndNormalize(deletePrefix, endpoint, {...options, restfulMethod: 'delete'}, callbacks);
  };

  postFormData = <Params extends PostParams, ApiResponseData = Model>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) => this.post(endpoint, prefix, {requestConfig: {headers: {'content-type': 'multipart/form-data'}}, ...options}, callbacks);

  putFormData = <Params extends PutParams, ApiResponseData = Model>(
    endpoint: string,
    prefix?: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) => this.put(endpoint, prefix, {requestConfig: {headers: {'content-type': 'multipart/form-data'}}, ...options}, callbacks);

  private fetchRequest<Params extends FetchParams, ApiResponseData>(
    endpoint: string,
    prefix: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params> | AxiosResult<ApiResponseData, Params> | ThunkRawResult<ApiResponseData, Params> {
    if (options?.isCallApiOnly === true) {
      return this.createApiRequestThunk(endpoint, options, callbacks);
    }

    if (options?.withoutNormalize === true) {
      return this.createAsyncThunkWithoutNormalize<ApiResponseData, Params>(prefix, endpoint, options, callbacks);
    }

    return this.createAsyncThunkAndNormalize(prefix, endpoint, options, callbacks);
  }

  private postRequest<Params, ApiResponseData>(
    endpoint: string,
    prefix: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ): ThunkResult<Entities, Params> | AxiosResult<ApiResponseData, Params> | ThunkRawResult<ApiResponseData, Params> {
    if (options?.isCallApiOnly === true) {
      return this.createApiRequestThunk(endpoint, options, callbacks);
    }

    if (options?.withoutNormalize === true) {
      return this.createAsyncThunkWithoutNormalize<ApiResponseData, Params>(prefix, endpoint, options, callbacks);
    }

    return this.createAsyncThunkAndNormalize(prefix, endpoint, options, callbacks);
  }

  private createAsyncThunkAndNormalize<ApiResponseData, Params extends BaseRequest>(
    prefix: string,
    endpoint: string,
    options?: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return createAsyncThunk<
      NormalizedPayload<Entities>,
      Params,
      {dispatch: AppDispatch; rejectValue: RejectErrorValue; state: RootState}
    >(`${this.namespace}/${prefix}`, async (params: Params, {dispatch, rejectWithValue, getState}) => {
      const {source, data: requestData} = params;

      try {
        const responseBody = await this.makeRequest<Params, ApiResponseData>(endpoint, params, options);
        const apiResponseData = (responseBody?.data?.data || {}) as ApiResponseData;
        const normalized = normalize<any, Entities>(
          apiResponseData,
          isArray(apiResponseData) ? [this.schemaEntity] : this.schemaEntity,
        );
        if (requestData instanceof FormData) {
          // @ts-ignore
          params.data = parseFormDataToObj(requestData);
        }
        const payload: NormalizedPayload<Entities, any, ApiResponseData> = {
          normalized,
          source,
          paginator: responseBody.data.paginator,
          apiResponseData: undefined,
        };
        if (options?.includeApiResponseData) {
          payload.apiResponseData = apiResponseData;
        }

        if (callbacks?.onSuccess) {
          await callbacks?.onSuccess({responseBody, returnPayload: payload, params, dispatch, getState});
        }

        return payload;
      } catch (e) {
        const appErr = new AppError(e);
        return rejectWithValue({
          errCode: appErr.customErrCode,
          errStatusCode: appErr.statusCode,
          contexts: appErr.contexts,
          errMsg: appErr.userMsg,
        } as RejectErrorValue);
      }
    });
  }

  private createAsyncThunkWithoutNormalize<ApiResponseData, Params>(
    prefix: string,
    endpoint: string,
    options: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return createAsyncThunk<ApiResponseData, Params, {dispatch: AppDispatch; state: RootState}>(
      `${this.namespace}/withoutNormalize/${prefix}`,
      async (params, {dispatch, getState, rejectWithValue}) => {
        try {
          const responseBody = await this.makeRequest<Params, ApiResponseData>(endpoint, params, options);
          const apiResponseData = (responseBody?.data?.data || {}) as ApiResponseData;
          if (callbacks?.onSuccess) {
            await callbacks?.onSuccess({responseBody, params, dispatch, getState});
          }
          return apiResponseData;
        } catch (e) {
          const appErr = new AppError(e);
          return rejectWithValue({
            errCode: appErr.customErrCode,
            errStatusCode: appErr.statusCode,
            contexts: appErr.contexts,
            errMsg: appErr.userMsg,
          } as RejectErrorValue);
        }
      },
    );
  }

  private createApiRequestThunk<ApiResponseData, Params>(
    endpoint: string,
    options: ThunkOptions,
    callbacks?: Callbacks<ApiResponse<ApiResponseData>, NormalizedPayload<Entities>, Params>,
  ) {
    return async (params: Params) => {
      const responseBody = await this.makeRequest<Params, ApiResponseData>(endpoint, params, options);
      if (callbacks?.onSuccess) {
        await callbacks?.onSuccess({responseBody, params});
      }
      return responseBody;
    };
  }

  private async makeRequest<Params extends BaseRequest, ApiResponseData>(
    endpoint: string,
    params: Params,
    options?: ThunkOptions,
  ) {
    let data = params?.data;
    const useSnakeCase = isBoolean(options?.isSnakeCase) ? options?.isSnakeCase : this.isSnakeCase;
    if (!isEmpty(data)) {
      if (!(data instanceof FormData)) {
        if (useSnakeCase) {
          data = snakeCaseObj(data);
        }
      }
    }
    const urlPlaceholders = options?.urlPlaceholders || [];
    if (options?.restfulMethod === 'put') {
      urlPlaceholders.push(':id');
    }
    const url = getFullUrl(endpoint, {urlPlaceholders, ...params}, useSnakeCase);
    if (options?.restfulMethod === 'put' || options?.restfulMethod === 'post') {
      const requestApi = options?.restfulMethod === 'put' ? request.put : request.post;
      return (await requestApi(url, data, options?.requestConfig)) as ApiResponse<ApiResponseData>;
    }
    if (options?.restfulMethod === 'delete') {
      return (await request.delete(url, options?.requestConfig)) as ApiResponse<ApiResponseData>;
    }
    return (await request.get(url, options?.requestConfig)) as ApiResponse<ApiResponseData>;
  }
}

const getFullUrl = (endpoint: string, params: FetchParams, isUseSnakeCase?: boolean) => {
  const {urlPlaceholders, source, ...rest} = params;
  let url = endpoint;
  if (urlPlaceholders) {
    urlPlaceholders.forEach(urlPlaceholder => {
      const paramName = urlPlaceholder.replace(':', '');
      url = url.replace(urlPlaceholder, params[paramName]);
    });
  }
  url += serializeQueryString({...rest}, {snakeKey: isUseSnakeCase});
  return url;
};
