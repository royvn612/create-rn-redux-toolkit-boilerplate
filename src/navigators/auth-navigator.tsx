import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  getInitialRouteName,
  SCREEN_BOARDING,
  SCREEN_CONSENT,
  SCREEN_SIGN_IN,
  SCREEN_SIGN_UP,
  STACK_SIGN_IN,
  STACK_SIGN_UP,
  TOP_TAB_AUTH,
} from '~/navigators/route-names';
import {BoardingScreen, SignInScreen, SignUpScreen} from '~/screens';
import {defaultStackScreenOptions} from '~/navigators/config';
import {Icon} from '~/components/elements';
import {color} from '~/theme';

export type AuthParamList = {
  [SCREEN_BOARDING]: undefined;
  [TOP_TAB_AUTH]: undefined;
  [SCREEN_CONSENT]: undefined;
};
export type SignInParamList = {
  [SCREEN_SIGN_IN]: undefined;
};
export type SignUpParamList = {
  [SCREEN_SIGN_UP]: undefined;
};
export type ConsentParamList = {
  [SCREEN_CONSENT]: undefined;
};

const AuthStack = createStackNavigator<AuthParamList>();
const SignInStack = createStackNavigator<SignInParamList>();
const SignUpStack = createStackNavigator<SignUpParamList>();
const TopTab = createMaterialTopTabNavigator();

export const SignInNavigator = ({route}: any) => (
  <SignInStack.Navigator initialRouteName={getInitialRouteName(route.name)}>
    <SignInStack.Screen name={SCREEN_SIGN_IN} component={SignInScreen} options={{headerShown: false}} />
  </SignInStack.Navigator>
);

export const SignUpNavigator = ({route}: any) => (
  <SignUpStack.Navigator initialRouteName={getInitialRouteName(route.name)}>
    <SignUpStack.Screen name={SCREEN_SIGN_UP} component={SignUpScreen} options={{headerShown: false}} />
  </SignUpStack.Navigator>
);

export const TopTabAuthNavigator = ({route}: any) => (
  <TopTab.Navigator
    initialRouteName={getInitialRouteName(route.name)}
    tabBarOptions={{labelStyle: {textTransform: 'none'}, indicatorStyle: {backgroundColor: '#457672'}}}>
    <TopTab.Screen name={STACK_SIGN_IN} component={SignInNavigator} options={{title: 'Sign In'}} />
    <TopTab.Screen name={STACK_SIGN_UP} component={SignUpNavigator} options={{title: 'Create Account'}} />
  </TopTab.Navigator>
);

const authOptions = {
  ...defaultStackScreenOptions,
  headerStyle: {shadowColor: 'transparent', backgroundColor: color.palette.white},
};
export const AuthNavigator = ({route, navigation}: any) => (
  <AuthStack.Navigator screenOptions={authOptions} initialRouteName={getInitialRouteName(route.name)}>
    <AuthStack.Screen name={SCREEN_BOARDING} component={BoardingScreen} options={{headerShown: false}} />
    <AuthStack.Screen
      name={TOP_TAB_AUTH}
      component={TopTabAuthNavigator}
      options={{
        headerShown: true,
        headerTitle: () => <Icon name="logo-black" type="image" width={80} height={40} mt={2} />,
      }}
    />
  </AuthStack.Navigator>
);
