/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {ThemeProvider} from 'react-native-elements';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import rootStore from '~/redux/root-store';
import ErrorBoundary from '~/components/ErrorBoundary';
import {RootNavigator} from '~/navigators/root-navigator';
import config from '~/config/app-config';
import {uiTheme} from '~/theme';
// declare const global: {HermesInternal: null | {}};

LogBox.ignoreLogs([
  // 'Warning: componentWillMount is deprecated',
  // 'Warning: componentWillReceiveProps is deprecated',
  // 'Warning: Function components cannot be given refs.',
  // 'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={rootStore}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <StyledThemeProvider theme={config.theme}>
            <ThemeProvider theme={uiTheme}>
              <BottomSheetModalProvider>
                <RootNavigator />
                <FlashMessage position="top" />
              </BottomSheetModalProvider>
            </ThemeProvider>
          </StyledThemeProvider>
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
