import {FetchParams, PutParams} from '~/utils/thunk-api/type';
import {ThunkApi} from '~/utils/thunk-api';
import {UserEntities, UserModel, UserSchema} from '~/redux/users/types';
import {usersEntity} from '~/redux/schema';
import {ENDPOINTS} from '~/constants';
import * as storage from '~/utils/storage';

export interface FetchUsersParams extends FetchParams {
  search?: string;
}

export interface FetchUserInfoParams extends FetchParams {}

export interface UpdateUserParams extends PutParams {
  id: number;
  data: Partial<UserSchema>;
}

const thunk = new ThunkApi<UserModel, UserEntities>('users', usersEntity);

export const fetchUserInfo = thunk.fetchOne<FetchUserInfoParams>(
  ENDPOINTS.CURRENT_USER,
  'me/detail',
  {includeApiResponseData: true},
  {
    onSuccess: async ({responseBody}) => {
      const {data} = responseBody || {};
      if (data?.data) {
        await storage.save('USER', data?.data);
      }
    },
  },
);
export const updateCurrentUser = thunk.put<UpdateUserParams>(`${ENDPOINTS.CURRENT_USER}`);
