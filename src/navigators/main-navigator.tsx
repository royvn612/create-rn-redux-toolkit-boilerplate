import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {
  BOTTOM_TAB_MAIN,
  getInitialRouteName,
  STACK_HOME,
  STACK_SECOND,
  STACK_SETTINGS,
  STACK_THIRD,
} from '~/navigators/route-names';
import {Icon, Text} from '~/components/elements';
import {defaultStackScreenOptions} from '~/navigators/config';
import {SettingsNavigator} from '~/navigators/settings-navigator';
import {EmptyNavigator} from '~/navigators/templates/empty-navigator';

export type MainStackParamList = {
  [BOTTOM_TAB_MAIN]: undefined;
};
export type BottomTabMainParamList = {
  [STACK_HOME]: undefined;
  [STACK_SECOND]: undefined;
  [STACK_THIRD]: undefined;
  [STACK_SETTINGS]: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator<BottomTabMainParamList>();

const tabBarIcons: Record<string, any> = {
  [STACK_HOME]: {name: 'home', type: 'image'},
  [STACK_SECOND]: {name: 'insight', type: 'image'},
  [STACK_THIRD]: {name: 'community', type: 'image'},
  [STACK_SETTINGS]: {name: 'telehealth', type: 'image'},
};
const bottomLabelMap = {
  [STACK_HOME]: 'Home',
  [STACK_SECOND]: 'Insight',
  [STACK_THIRD]: 'Community',
  [STACK_SETTINGS]: 'Settings',
};

type BottomTabMainProps = RouteProp<MainStackParamList, typeof BOTTOM_TAB_MAIN>;

const BottomTabMainNavigator = ({route: {name}}: {route: BottomTabMainProps}) => (
  <Tab.Navigator
    initialRouteName={getInitialRouteName(name)}
    tabBarOptions={{showLabel: true}}
    screenOptions={({route}) => ({
      // eslint-disable-next-line react/prop-types
      tabBarLabel: ({focused}) => <Text text={bottomLabelMap[route.name]} variant="small" />,
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({focused}) => {
        const icon = tabBarIcons[route.name];
        return (
          <View>
            <Icon name={focused ? `${icon.name}-active` : icon.name} type={icon.type} />
          </View>
        );
      },
    })}>
    <Tab.Screen name={STACK_HOME} component={EmptyNavigator} />
    <Tab.Screen name={STACK_SECOND} component={EmptyNavigator} />
    <Tab.Screen name={STACK_THIRD} component={EmptyNavigator} />
    <Tab.Screen name={STACK_SETTINGS} component={SettingsNavigator} />
  </Tab.Navigator>
);

export const MainNavigator = ({route}: any) => (
  <Stack.Navigator screenOptions={defaultStackScreenOptions} initialRouteName={getInitialRouteName(route.name)}>
    <Stack.Screen name={BOTTOM_TAB_MAIN} component={BottomTabMainNavigator} options={{headerShown: false}} />
  </Stack.Navigator>
);
