import env from 'react-native-config';
import {THEME_NAMES, THEME_SIZES, ThemeConfig} from '~/theme';

interface AppConfig {
  theme: ThemeConfig;
  sentry: {isEnable: boolean; dsn: string};
  googleAuth: {iosClientId: string; webClientId: {ios: string; android: string}};
  api: {
    host: string;
    url: string;
    timeout: number;
  };

  [key: string]: any;
}

const {stage} = env;
const config: AppConfig = {
  theme: {name: THEME_NAMES.LIGHT, size: THEME_SIZES.NORMAL},
  sentry: {isEnable: !!env.SENTRY_ENABLED, dsn: env.SENTRY_DSN},
  api: {
    host: env.API_HOST,
    url: `${env.API_HOST}/api/v1`,
    timeout: 30000,
  },
  googleAuth: {
    iosClientId: '',
    webClientId: {
      ios: '', // same as iosClientID
      android: '',
    },
  },
};

if (stage === 'staging') {
}
if (stage === 'production') {
}

export default config;
