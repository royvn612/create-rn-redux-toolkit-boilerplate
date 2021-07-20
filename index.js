import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import App from '~/App';
import {name as appName} from './app.json';
import {appConfig} from '~/config';

if (appConfig.sentry.isEnable) {
  Sentry.init({
    dsn: appConfig.sentry.dsn,
  });
}

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  iosClientId: appConfig.googleAuth.iosClientId,
  webClientId: appConfig.googleAuth.webClientId[Platform.OS],
});

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

const MyApp = process.env.NODE_ENV === 'development' ? App : codePush(codePushOptions)(App);

AppRegistry.registerComponent(appName, () => MyApp);
