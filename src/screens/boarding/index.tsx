import React from 'react';
import styled from 'styled-components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomSafeAreaView, Button, Col, Icon, Row, Screen, Wallpaper, Text} from '~/components/elements';
import {spacingPx} from '~/theme';
import {STACK_SIGN_IN, STACK_SIGN_UP, TOP_TAB_AUTH} from '~/navigators/route-names';

const LogoContainer = styled(Col.X)`
  justify-content: center;
  margin-top: 150px;
  position: absolute;
  align-self: center;
`;

const styles = StyleSheet.create({
  paginationStyle: {
    bottom: 0,
  },
  dotStyle: {
    marginBottom: '9%',
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentStyle: {},
  containerStyle: {},
});

export const BoardingScreen = () => {
  const {navigate} = useNavigation();

  return (
    <Col.X>
      <Wallpaper name="bg" />
      <Screen>
        <LogoContainer>
          <Icon name="logo" type="image" width={150} height={150} />
        </LogoContainer>
        <Col style={styles.contentWrapper} mx="screen">
          <Button
            title="Create an account"
            mt={8}
            type="outline"
            mb={3}
            onPress={() => navigate(TOP_TAB_AUTH, {screen: STACK_SIGN_UP})}
          />
          <Button
            title="Sign In"
            variant="white"
            type="outline"
            onPress={() => navigate(TOP_TAB_AUTH, {screen: STACK_SIGN_IN})}
          />
          <BottomSafeAreaView />
        </Col>
      </Screen>
    </Col.X>
  );
};
