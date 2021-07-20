import axios from 'axios';
import * as RNLocalize from 'react-native-localize';
import {appConfig} from '~/config';

const request = (() =>
  axios.create({
    baseURL: appConfig.api.url,
    timeout: appConfig.api.timeout,
  }))();

request.interceptors.request.use(
  axiosConfig => axiosConfig,
  error => Promise.reject(error),
);
request.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export function setTokenRequestHeader(accessToken?: string) {
  request.defaults.headers.authorization = `Bearer ${accessToken}`;
  request.defaults.headers['timezone-id'] = RNLocalize.getTimeZone();
}

export function removeTokenRequestHeader() {
  request.defaults.headers.authorization = '';
}

export default request;
