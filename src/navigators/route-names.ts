import {findValuePath} from '~/utils/helpers';

export const STACK_ROOT = 'STACK_ROOT';
export const STACK_AUTH = 'STACK_AUTH';
export const STACK_SIGN_IN = 'STACK_SIGN_IN';
export const STACK_SIGN_UP = 'STACK_SIGN_UP';
export const STACK_MAIN = 'STACK_MAIN';
export const STACK_HOME = 'STACK_HOME';
export const STACK_SECOND = 'STACK_SECOND';
export const STACK_THIRD = 'STACK_THIRD';
export const STACK_SETTINGS = 'STACK_SETTINGS';

export const TOP_TAB_AUTH = 'TOP_TAB_AUTH';

export const BOTTOM_TAB_MAIN = 'BOTTOM_TAB_MAIN';

export const SCREEN_BOARDING = 'SCREEN_BOARDING';
export const SCREEN_SIGN_IN = 'SCREEN_SIGN_IN';
export const SCREEN_SIGN_UP = 'SCREEN_SIGN_UP';
export const SCREEN_CONSENT = 'SCREEN_CONSENT';
export const SCREEN_SETTINGS = 'SCREEN_SETTINGS';
export const SCREEN_PROFILE = 'SCREEN_PROFILE';
export const SCREEN_DETAILS = 'SCREEN_DETAILS';
export const SCREEN_PERSONAL_INFO = 'SCREEN_PERSONAL_INFO';
export const SCREEN_EMPTY = 'SCREEN_EMPTY';

// This help to visualize our navigators
const routeMap = {
  STACK_AUTH: {
    SCREEN_BOARDING,
    TOP_TAB_AUTH: {
      STACK_SIGN_IN: {SCREEN_SIGN_IN},
      STACK_SIGN_UP: {SCREEN_SIGN_UP},
    },
  },
  SCREEN_CONSENT,
  STACK_MAIN: {
    BOTTOM_TAB_MAIN: {
      STACK_HOME: {
        TOP_TAB_HOME: {
          STACK_TODAY: {
            SCREEN_EMPTY,
          },
          STACK_JOURNEY: {
            SCREEN_EMPTY,
          },
        },
      },
      STACK_2: {
        SCREEN_EMPTY,
      },
      STACK_3: {
        SCREEN_EMPTY,
      },
      STACK_SETTINGS: {
        SCREEN_SETTINGS,
        SCREEN_PROFILE,
        SCREEN_DETAILS,
        SCREEN_PERSONAL_INFO,
      },
    },
  },
};

const initRoutePaths = findValuePath(routeMap, 'default');
initRoutePaths.push(STACK_ROOT);

export const getInitialRouteName: <Return>(arg1: string, b?: Return) => Return | undefined = (navigatorName, defaultRoute) => {
  const indexInPath = initRoutePaths.indexOf(navigatorName);

  if (indexInPath === -1) {
    return defaultRoute;
  }

  return initRoutePaths[indexInPath - 1] as keyof typeof defaultRoute;
};
