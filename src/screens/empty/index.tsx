import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomSafeAreaView, Button, Col, Icon, Image, Row, Screen, Text, Wallpaper} from '~/components/elements';

const styles = StyleSheet.create({});

export const EmptyScreen = () => (
  <Col.X>
    <Wallpaper gradientColors={['#F1EEE4', '#F1EEE400']} />
    <Screen unsafe preset="scroll" hasFooter>
      <Col.X>
        <Col mx="screen">
          <Row.C mt={5}>
            <Icon name="logo" size={120} type="image" />
          </Row.C>
          <Col.C>
            <Text mt={8} mb={5} text="Meow~" variant="title" />
            <Image source={{uri: `https://source.unsplash.com/collection/3816160/300x300?sig=${Math.random()}`}} />
          </Col.C>
        </Col>
      </Col.X>
      <Button title="A button" variant="primary" mx="screen" />
      <BottomSafeAreaView />
    </Screen>
  </Col.X>
);
