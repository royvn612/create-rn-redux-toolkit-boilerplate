import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomSafeAreaView, Button, Col, Icon, Screen, Text, Wallpaper} from '~/components/elements';

const styles = StyleSheet.create({});

export const EmptyScreen = () => {
  return (
    <Col.X>
      <Wallpaper gradientColors={['#F1EEE4', '#F1EEE400']} />
      <Screen unsafe preset="scroll" hasFooter>
        <Col.X>
          <Col px="screen">
            <Icon name="insight-top-right-icons" size={120} type="image" />
            <Text mt={3} text={`Component mounted at: ${Date.now().toString()}`} variant="title" />
          </Col>
        </Col.X>
        <Button title="Void button" variant="primary" />
        <BottomSafeAreaView />
      </Screen>
    </Col.X>
  );
};
