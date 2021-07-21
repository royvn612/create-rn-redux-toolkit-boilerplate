import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getInitialRouteName, SCREEN_EMPTY} from '~/navigators/route-names';
import {defaultStackScreenOptions} from '~/navigators/config';
import {EmptyScreen} from '~/screens/empty';

export type InsightParamList = {
  [SCREEN_EMPTY]: undefined;
};
const Stack = createStackNavigator<InsightParamList>();

export const EmptyNavigator = ({route}: any) => (
  <Stack.Navigator initialRouteName={getInitialRouteName(route.name)} screenOptions={defaultStackScreenOptions}>
    <Stack.Screen name={SCREEN_EMPTY} component={EmptyScreen} options={{headerShown: true, headerTitle: 'Sample Screen'}} />
  </Stack.Navigator>
);
