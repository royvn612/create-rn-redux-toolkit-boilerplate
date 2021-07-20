import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeSafeAreaViewProps} from 'react-native-safe-area-context/lib/typescript/src/SafeArea.types';

const styles = StyleSheet.create({
  bottom: {
    marginBottom: 10,
  },
});

export const BottomSafeAreaView = memo((props: NativeSafeAreaViewProps) => (
  <SafeAreaView edges={['right', 'bottom', 'left']} style={styles.bottom} {...props} />
));
