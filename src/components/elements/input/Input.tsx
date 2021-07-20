import React, {memo} from 'react';
import {Input as BaseInput} from 'react-native-elements';
import {InputProps} from '~/components/elements/input/input.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';

export const Input = memo(({containerStyle, ...rest}: InputProps) => {
  const spacingStyle = useSpacingStyle(rest);

  return <BaseInput containerStyle={[containerStyle, spacingStyle]} {...rest} />;
});
