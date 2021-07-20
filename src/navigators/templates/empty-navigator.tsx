import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getInitialRouteName, SCREEN_EMPTY} from '~/navigators/route-names';
import {EmptyScreen} from '~/screens';
import {defaultStackScreenOptions} from '~/navigators/config';

export type InsightParamList = {
  [SCREEN_EMPTY]: undefined;
};
const Stack = createStackNavigator<InsightParamList>();

export const EmptyNavigator = ({route}: any) => (
  <Stack.Navigator initialRouteName={getInitialRouteName(route.name)} screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name={SCREEN_EMPTY} component={EmptyScreen} options={{headerShown: false}} />
  </Stack.Navigator>
);
