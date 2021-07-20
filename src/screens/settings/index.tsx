import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {BottomSafeAreaView, Col, Icon, Screen, Text, Wallpaper} from '~/components/elements';
import {HintCard, MenuItem, MenuListCard} from '~/components/shared';
import {SCREEN_PROFILE} from '~/navigators/route-names';
import {AppDispatch} from '~/redux/root-store';
import {logout} from '~/redux/auth/thunk';
import {RootState} from '~/redux/root-reducer';
import {getUserDisplayName} from '~/utils/helpers';

const topMenu: MenuItem[] = [
  {
    name: 'My profile',
    nextScreen: SCREEN_PROFILE,
  },
  {
    name: 'Manage My Program',
  },
  {
    name: 'Friends Referal',
  },
  {
    name: 'Payment',
  },
];
const bottomMenu: MenuItem[] = [
  {
    name: 'Help Center',
  },
  {
    name: 'Contact Us',
  },
  {
    name: 'Settings',
  },
  {
    name: 'Logout',
  },
];

export const SettingsScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {navigate} = useNavigation();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)!;

  const handlePressMenu = (menu: MenuItem) => {
    if (menu.nextScreen) {
      navigate(menu.nextScreen);
    }
    if (menu.name === 'Logout') {
      dispatch(logout());
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
          <HintCard
            mb={5}
            bgColor="peachpuff"
            iconProps={{name: 'upgrade-box', type: 'image', size: 45}}
            title="Upgrade Your Manage Plan "
            description="To use full of feature you can upgrade plan"
          />
          <MenuListCard menuList={bottomMenu} onPress={handlePressMenu} />
        </Col>
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
