import React, {useState} from 'react';
import styled from 'styled-components';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import {BottomSafeAreaView, Button, Col, Icon, Row, Screen} from '~/components/elements';
import {BoardingWallpaper} from '~/components/shared';
import {spacingPx} from '~/theme';
import {STACK_SIGN_IN, STACK_SIGN_UP, TOP_TAB_AUTH} from '~/navigators/route-names';

const LogoContainer = styled(Row.X)`
  justify-content: center;
  padding-top: ${spacingPx[8]};
  position: absolute;
  align-self: center;
`;
const Content = styled(Col)`
  padding-bottom: ${spacingPx[2]};
`;

const StyledView = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
  const [footerHeight, setFooterHeight] = useState(0);
  const onLayout = (event: any) => {
    const {x, y, height, width} = event.nativeEvent.layout;
    setFooterHeight(height);
  };

  const texts = [
    'Track contraceptive use, get reminders and unlock achievements to help you stay on track ',
    'Track symptoms & health improvements and access action plans to assist your journey',
    'See a doctor online, access ongoing support and get your medication delivered within 4 hrs',
    'Receive personalized daily insights and tips to stay on top of your health and wellness',
    'Join our community forum to share tips, ask questions and connect with experts',
  ];

  return (
    <Col.X>
      <Screen>
        <StyledView>
          <Swiper
            autoplay
            paginationStyle={{bottom: footerHeight - 60}}
            activeDotColor="white"
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.dotStyle}
            dotColor="rgba(255, 255, 255, 0.3)">
            <BoardingWallpaper text={texts[0]} name="boarding-bg1" footerHeight={footerHeight} />
            <BoardingWallpaper text={texts[1]} name="boarding-bg2" footerHeight={footerHeight} />
            <BoardingWallpaper text={texts[2]} name="boarding-bg3" footerHeight={footerHeight} />
            <BoardingWallpaper text={texts[3]} name="boarding-bg4" footerHeight={footerHeight} />
            <BoardingWallpaper text={texts[4]} name="boarding-bg5" footerHeight={footerHeight} />
          </Swiper>
        </StyledView>
        <LogoContainer>
          <Icon name="logo-white" type="image" width={80} height={40} />
        </LogoContainer>
        <Col style={styles.contentWrapper} mx="screen" onLayout={onLayout}>
          <Button
            title="Create an account"
            mt={8}
            variant="white"
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
