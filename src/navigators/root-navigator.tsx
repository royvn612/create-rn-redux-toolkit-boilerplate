import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import useAsyncEffect from 'use-async-effect';
import {getInitialRouteName, SCREEN_CONSENT, STACK_AUTH, STACK_MAIN, STACK_ROOT} from '~/navigators/route-names';
import {MainNavigator} from '~/navigators/main-navigator';
import {AuthNavigator} from '~/navigators/auth-navigator';
import {RootState} from '~/redux/root-reducer';
import {AppDispatch} from '~/redux/root-store';
import {logout, lookupSavedCredential, onLoginSuccess} from '~/redux/auth/thunk';
import {ScreenLoading} from '~/components/elements';
import NavigationRef from '~/utils/navigation-ref';
import {ConsentScreen} from '~/screens/consent';

export type RootParamList = {
  [STACK_MAIN]: undefined;
  [STACK_AUTH]: undefined;
  [SCREEN_CONSENT]: undefined;
};

const Stack = createStackNavigator<RootParamList>();

export const RootStack = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const loggedIn = !!useSelector((state: RootState) => state.auth.token);
  const screens = [];
  if (!loggedIn) {
    screens.push(
      <Stack.Screen key={STACK_AUTH} name={STACK_AUTH} component={AuthNavigator} options={{headerShown: false, title: ''}} />,
    );
  }
  if (currentUser?.isActive) {
    if (!currentUser?.isConsentAccepted) {
      screens.push(
        <Stack.Screen key={SCREEN_CONSENT} name={SCREEN_CONSENT} component={ConsentScreen} options={{headerShown: false}} />,
      );
    }
    if (loggedIn && currentUser?.isActive && currentUser?.isConsentAccepted) {
      screens.push(
        <Stack.Screen key={STACK_MAIN} name={STACK_MAIN} component={MainNavigator} options={{headerShown: false, title: ''}} />,
      );
    }
  }

  return <Stack.Navigator initialRouteName={getInitialRouteName(STACK_ROOT)}>{screens}</Stack.Navigator>;
};

export const RootNavigator = (props: any) => {
  const dispatch: AppDispatch = useDispatch();

  const {message, description, type} = useSelector((state: RootState) => state.ui.messageBag);
  const lastRequestStatusCode = useSelector((state: RootState) => state.ui.lastRequestStatusCode);

  const [isInitialising, setIsInitialising] = useState(true);
  // const [isOutDate, setIsOutDate] = useState<boolean>(false);

  useEffect(() => {
    if (message) {
      showMessage({
        message,
        description,
        type,
      });
    }
  }, [description, message, type]);

  useAsyncEffect(async () => {
    if (lastRequestStatusCode === 401) {
      await dispatch(logout());
    }
  }, [lastRequestStatusCode]);

  useAsyncEffect(async () => {
    // const settings = await dispatch(fetchAppSetting());
    // if (fetchAppSetting.fulfilled.match(settings)) {
    //   const {payload} = settings;
    //   if (!isLatestVersion(payload)) {
    //     setIsOutDate(true);
    //     return null;
    //   }
    // }
    const savedCredential = await lookupSavedCredential();
    if (savedCredential.token) {
      await dispatch(onLoginSuccess(savedCredential));
    }
    setIsInitialising(false);
  }, [dispatch]);

  // if (isOutDate) {
  //   return <ForceUpdateScreen />;
  // }

  if (isInitialising) {
    return <ScreenLoading />;
  }
  return (
    <NavigationContainer ref={NavigationRef.navigationRef} {...props}>
      <RootStack />
    </NavigationContainer>
  );
};

// const isLatestVersion = (settings: AppSetting) => {
//   const appVersionKey = Platform.OS === 'ios' ? 'ios_version' : 'android_version';
//   const latestAppVersion = settings?.[appVersionKey];
//   return compareVersion(VersionNumber.appVersion, latestAppVersion) > -1;
// };
