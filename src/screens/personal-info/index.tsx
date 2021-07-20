import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {BottomSafeAreaView, Button, Card, Col, Icon, Image, ListItem, Screen, Text, Wallpaper} from '~/components/elements';
import {MenuItem} from '~/components/shared';
import {color} from '~/theme';
import {getUserDisplayName} from '~/utils/helpers';
import {RootState} from '~/redux/root-reducer';

const topMenu: MenuItem[] = [
  {
    name: 'Full Name',
    value: 'Jane Denise Doe',
  },
  {
    name: 'Preferred Name',
    value: 'Jane',
  },
  {
    name: 'Mobile Number',
    value: '0939939393',
  },
  {
    name: 'Email',
    value: 'congcare@gmail.com',
  },
  {
    name: 'Date Of Birth',
    value: '01/01/2001',
  },
];
const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: 200,
  },
});
export const PersonalScreen = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser)!;

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
          <Card py={0} mb={5}>
            {topMenu.map((l, i) => (
              <ListItem key={`top-menu-${l.name}`} bottomDivider>
                <ListItem.Content>
                  <Text mb={3} text={l.name} color={color.textSecondary} />
                  <Text text={l.value} weight="semiBold" />
                </ListItem.Content>
              </ListItem>
            ))}
          </Card>
          <Col>
            <Image
              source={{
                uri: 'https://www.visa.com.vn/dam/VCOM/regional/ap/vietnam/global-elements/images/vn-visa-classic-card-498x280.png',
              }}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </Col>
          <Button my={3} title="View Photo ID" variant="primary" type="outline" />
          <Button title="Upload New Photo ID" variant="primary" type="outline" />
        </Col>
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
