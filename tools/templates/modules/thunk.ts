import {ENDPOINTS} from '~/constants';
import {ThunkApi} from '~/utils/thunk-api';
import {DeleteParams, FetchParams, PostParams, PutParams} from '~/utils/thunk-api/type';
import {__module__(pascalCase)Entities, __module__(pascalCase)Model, __module__(pascalCase)Schema} from '~/redux/__module__(kebabCase)s/types';
import {__module__(camelCase)sEntity} from '~/redux/schema';

export interface Fetch__module__(pascalCase)sParams extends FetchParams {}

export interface Add__module__(pascalCase)Params extends PostParams {
  data: Partial<__module__(pascalCase)Schema>;
}

export interface Update__module__(pascalCase)Params extends PutParams {
  data: Partial<__module__(pascalCase)Schema>;
  id: number;
}

const thunk = new ThunkApi<__module__(pascalCase)Model, __module__(pascalCase)Entities>('__module__(camelCase)', __module__(camelCase)sEntity);
export const fetch__module__(pascalCase)s = thunk.fetch<Fetch__module__(pascalCase)sParams>(ENDPOINTS.__module__(constantCase)S);
export const add__module__(pascalCase) = thunk.post<Add__module__(pascalCase)Params>(ENDPOINTS.__module__(constantCase)S);
export const update__module__(pascalCase) = thunk.put<Update__module__(pascalCase)Params>(`${ENDPOINTS.__module__(constantCase)S}/:id`);
export const delete__module__(pascalCase) = thunk.delete<DeleteParams>(`${ENDPOINTS.__module__(constantCase)S}/:id`);
