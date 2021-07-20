import React, {memo} from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {Col} from './elements/grid/Col';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {BaseProps} from '~/components/base.props';

interface Props extends BaseProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const ScreenLoading = memo(({containerStyle, ...rest}: Props) => {
  const spacingStyle = useSpacingStyle(rest);
  return (
    <Col.C.X style={[containerStyle, spacingStyle]}>
      <ActivityIndicator color="grey" />
    </Col.C.X>
  );
});
