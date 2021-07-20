/* eslint-disable no-console, no-underscore-dangle */
import * as Sentry from '@sentry/react-native';
import {AxiosError} from 'axios';
import * as storage from '~/utils/storage';
import {appConfig} from '~/config';

type AppErrType = Partial<AxiosError> & Error;

interface ErrorOptions {
  shouldReport?: boolean;
  debugMessage?: string;
}

async function reportToSentry(err: AppErrType, debugMsg = '') {
  if (!Sentry.getCurrentHub().getClient()) {
    Sentry.init({dsn: appConfig.sentry.dsn});
  }
  const user = await storage.load('USER');
  Sentry.setExtra('user', user);
  if (user) {
    Sentry.setUser(user);
    Sentry.setExtra('debug_msg', debugMsg);
  }
  Sentry.captureException(err);
}

export default class AppError {
  userMsg?: string;

  message?: string; // just an alias for userMsg

  err: AppErrType;

  originalErrMsg: string;

  debugMsg: string;

  isAxiosErr: boolean;

  customErrCode: string | null;

  messageBag: null;

  contexts: {[key: string]: any} | undefined;

  statusCode?: number;

  constructor(err: AppErrType, userMessage = '', {debugMessage = '', shouldReport = true}: ErrorOptions = {}) {
    this.err = err;
    this.originalErrMsg = err.message;
    this.debugMsg = debugMessage || 'Error!';
    this.isAxiosErr = !!(err.response || err.request);
    this.customErrCode = null;
    this.messageBag = null;
    this.contexts = undefined;
    this.statusCode = this.isAxiosErr ? err?.response?.status : 500;
    this.handleErr(userMessage, shouldReport);
  }

  handleErr = (userMessage: string, shouldReport: boolean) => {
    this.userMsg = this.originalErrMsg;
    if (this.isAxiosErr) {
      this.userMsg = this.err.response?.data?.message || this.userMsg;
    }
    this.userMsg = userMessage || this.userMsg;
    this.message = this.userMsg;
    console.log('---------Debug:---------');
    console.log(this.debugMsg);
    this.printLog(this.err);
    if (this.statusCode === 422 || this.statusCode === 404) {
      shouldReport = false;
    }
    if (appConfig.sentry.isEnable && shouldReport) {
      reportToSentry(this.err, this.debugMsg).then(r => r);
    }
  };

  printLog = (error: AppErrType) => {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      this.customErrCode = error.response.data.error_code;
      this.messageBag = error.response.data.errors;
      this.contexts = error.response.data.fields;
      this.statusCode = error.response.status;
      const {url, data, method} = error.response.config;
      const requestInfo = {
        method,
        url,
        data,
      };
      console.log('Response headers:');
      console.log(error.response.headers);
      console.log('Response body:');
      console.log(error.response.data);
      console.log('Request info:');
      console.log(requestInfo);
      Sentry.setExtra('error_header', error.response.headers);
      Sentry.setExtra('error_data', error.response.data);
      Sentry.setExtra('request_info', requestInfo);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      console.log('Axios requested but no response is returned!');
      console.log(error.request._response);
      console.log(error.request);
      Sentry.setExtra('error_request', error.request);
      Sentry.setExtra('error_request_response', error.request._response);
    } else {
      console.log(error);
      Sentry.setExtra('error', error);
    }
  };
}
