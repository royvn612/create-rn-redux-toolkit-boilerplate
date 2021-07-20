import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getInitialRouteName, SCREEN_EMPTY, STACK_JOURNEY, STACK_TODAY} from '~/navigators/route-names';
import {EmptyScreen} from '~/screens';
import {defaultStackScreenOptions} from '~/navigators/config';
import {color} from '~/theme';

export type TopTabStackParamList = {
  // [TOP_TAB_NAME]: undefined;
};
export type Tab1ParamList = {
  [SCREEN_EMPTY]: undefined;
};
export type Tab2ParamList = {
  [SCREEN_EMPTY]: undefined;
};
const Stack = createStackNavigator<TopTabStackParamList>();
const Tab1Stack = createStackNavigator<Tab1ParamList>();
const Tab2Stack = createStackNavigator<Tab2ParamList>();
const TopTab = createMaterialTopTabNavigator();

export const Tab1StackNavigator = ({route}: any) => (
  <Tab1Stack.Navigator initialRouteName={getInitialRouteName(route.name)}>
    <Tab1Stack.Screen name={SCREEN_EMPTY} component={EmptyScreen} options={{headerShown: false}} />
  </Tab1Stack.Navigator>
);

export const Tab2StackNavigator = ({route}: any) => (
  <Tab2Stack.Navigator initialRouteName={getInitialRouteName(route.name)}>
    <Tab2Stack.Screen name={SCREEN_EMPTY} component={EmptyScreen} options={{headerShown: false}} />
  </Tab2Stack.Navigator>
);

export const TopTabNavigator = ({route}: any) => (
  <TopTab.Navigator
    initialRouteName={getInitialRouteName(route.name)}
    tabBarOptions={{
      labelStyle: {textTransform: 'none', fontWeight: '500'},
      activeTintColor: color.textLighter,
      indicatorStyle: {backgroundColor: color.primaryBackground},
    }}>
    <TopTab.Screen name={STACK_TODAY} component={Tab1StackNavigator} options={{title: 'Tab1'}} />
    <TopTab.Screen name={STACK_JOURNEY} component={Tab2StackNavigator} options={{title: 'Tab2'}} />
  </TopTab.Navigator>
);

export const TopTabStackNavigator = ({route}: any) => (
  <Stack.Navigator initialRouteName={getInitialRouteName(route.name)} screenOptions={defaultStackScreenOptions}>
    <Stack.Screen
      // name={TOP_TAB_NAME}
      component={TopTabNavigator}
      options={{headerShown: true}}
    />
  </Stack.Navigator>
);
