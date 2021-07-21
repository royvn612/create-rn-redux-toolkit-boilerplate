import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomSafeAreaView, Col, Icon, Screen, Text, Wallpaper} from '~/components/elements';
import {SCREEN_DETAILS} from '~/navigators/route-names';
import {MenuItem, MenuListCard} from '~/components/shared';
import {getUserDisplayName} from '~/utils/helpers';
import {RootState} from '~/redux/root-reducer';

const topMenu: MenuItem[] = [
  {
    name: 'My Details',
    nextScreen: SCREEN_DETAILS,
  },
  {
    name: 'Payment Methods',
  },
  {
    name: 'Addresses',
  },
];
const bottomMenu: MenuItem[] = [
  {
    name: 'Time Zone',
    value: 'GMT +7',
  },
  {
    name: 'Account Email',
    value: 'tester@gmail.com',
  },
  {
    name: 'Phone Number',
    value: '0987654321',
  },
  {
    name: 'Language',
    value: 'English',
  },
];

export const ProfileScreen = () => {
  const {navigate} = useNavigation();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)!;

  const handlePressMenu = (menu: MenuItem) => {
    if (menu.nextScreen) {
      navigate(menu.nextScreen);
    }
  };
  return (
    <Col.X>
      <Wallpaper />
      <Screen unsafe px="screen" preset="scroll">
        <Col mt={6}>
          <Col.C>
            <Icon name="dribbble" type="antdesign" size={70} />
            <Text mt={4} mb={2} text={getUserDisplayName(currentUser)} variant="subheading" />
            <Text mb={6} text="Strong beginner" />
          </Col.C>
          <MenuListCard menuList={topMenu} onPress={handlePressMenu} />
          <MenuListCard menuList={bottomMenu} onPress={handlePressMenu} />
        </Col>
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
