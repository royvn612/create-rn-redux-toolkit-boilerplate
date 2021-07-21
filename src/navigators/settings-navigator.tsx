import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  getInitialRouteName,
  SCREEN_DETAILS,
  SCREEN_PERSONAL_INFO,
  SCREEN_PROFILE,
  SCREEN_SETTINGS,
} from '~/navigators/route-names';
import {defaultStackScreenOptions} from '~/navigators/config';
import {ProfileScreen} from '~/screens/profile';
import {DetailsScreen} from '~/screens/my-details';
import {PersonalScreen} from '~/screens/personal-info';
import {SettingsScreen} from '~/screens/settings';

export type QuestionnaireParamList = {
  [SCREEN_SETTINGS]: undefined;
  [SCREEN_PROFILE]: undefined;
  [SCREEN_DETAILS]: undefined;
  [SCREEN_PERSONAL_INFO]: undefined;
};

const Stack = createStackNavigator<QuestionnaireParamList>();

export const SettingsNavigator = ({route}: any) => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions} initialRouteName={getInitialRouteName(route.name)}>
    <Stack.Screen name={SCREEN_SETTINGS} component={SettingsScreen} options={{headerShown: true, headerTitle: 'Settings'}} />
    <Stack.Screen name={SCREEN_PROFILE} component={ProfileScreen} options={{headerShown: true, headerTitle: 'Profile'}} />
    <Stack.Screen name={SCREEN_DETAILS} component={DetailsScreen} options={{headerShown: true, headerTitle: 'Profile'}} />
    <Stack.Screen name={SCREEN_PERSONAL_INFO} component={PersonalScreen} options={{headerShown: true, headerTitle: 'Profile'}} />
  </Stack.Navigator>
);
