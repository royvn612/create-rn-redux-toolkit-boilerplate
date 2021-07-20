import {appConfig} from '~/config';

const API_HOST = appConfig.api.host;
const API_URL = appConfig.api.url;

export const ENDPOINTS = {
  REGISTER: `/auth/register`,
  LOGIN: `/auth/login`,
  SOCIAL_LOGIN: `/auth/social/login`,
  CURRENT_USER: `/user/me`,
};
