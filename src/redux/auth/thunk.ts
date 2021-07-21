import {unwrapResult} from '@reduxjs/toolkit';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PostParams} from '~/utils/thunk-api/type';
import {requestOK, ThunkApi} from '~/utils/thunk-api';
import {AuthEntities, AuthModel} from '~/redux/auth/types';
import {authsEntity} from '~/redux/schema';
import {ENDPOINTS} from '~/constants';
import {removeTokenRequestHeader, setTokenRequestHeader} from '~/utils/request';
import * as storage from '~/utils/storage';
import {AppDispatch, AppThunk} from '~/redux/root-store';
import {setCurrentUser} from '~/redux/auth/slice';
import {fetchUserInfo} from '~/redux/users/thunk';

export interface LoginByEmailParams extends PostParams {
  data: {
    username: string;
    password: string;
  };
}

export interface RegisterParams extends PostParams {
  data: {
    email: string;
    password: string;
    name: string;
    preferredName?: string;
  };
}

export interface SocialLoginParams extends PostParams {
  data: {
    provider: string;
    token: string;
    clientId: string;
  };
}

export const lookupSavedCredential = async (): Promise<AuthModel> => {
  // await storage.clear();
  const user = await storage.load('USER');
  const token = (await storage.loadString('ACCESS_TOKEN')) || '';
  return {token, user};
};
export const onLoginSuccess =
  ({token, user}: AuthModel) =>
  async (dispatch: AppDispatch) => {
    let refreshUser = user;
    setTokenRequestHeader(token);

    const resAction = await dispatch(fetchUserInfo({}));
    if (requestOK(resAction, fetchUserInfo)) {
      const {apiResponseData} = unwrapResult(resAction);
      refreshUser = apiResponseData;
    }

    if (refreshUser?.isActive && refreshUser?.isConsentAccepted) {
      await storage.save('USER', refreshUser);
      await storage.saveString('ACCESS_TOKEN', token || '');
    }

    await dispatch!(setCurrentUser({user: refreshUser, token}));
  };

const thunk = new ThunkApi<AuthModel, AuthEntities>('auth', authsEntity);

export const register = thunk.post<RegisterParams>(ENDPOINTS.REGISTER, 'register', undefined, {
  onSuccess: async ({dispatch, responseBody}) => {
    // const {data} = responseBody || {};
    // const {user, token} = data?.data || {};
    // await dispatch!(onLoginSuccess({user, token}));
  },
});

export const loginByEmail = thunk.post<LoginByEmailParams>(ENDPOINTS.LOGIN, 'byEmail', undefined, {
  onSuccess: async ({dispatch, responseBody}) => {
    const {data} = responseBody || {};
    const {user, token} = data?.data || {};
    await dispatch!(onLoginSuccess({user, token}));
  },
});

export const socialLogin = thunk.post<SocialLoginParams>(ENDPOINTS.SOCIAL_LOGIN, 'bySocial', undefined, {
  onSuccess: async ({dispatch, responseBody}) => {
    const {data} = responseBody || {};
    const {user, token} = data?.data || {};
    await dispatch!(onLoginSuccess({user, token}));
  },
});

export const logout = (): AppThunk => async dispatch => {
  await storage.remove('USER');
  await storage.remove('ACCESS_TOKEN');
  try {
    await GoogleSignin.revokeAccess();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  removeTokenRequestHeader();
  dispatch({type: 'USER_LOGOUT'});
};
