import React, {memo} from 'react';
import {Button as BaseButton} from 'react-native-elements';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {ButtonProps} from '~/components/elements/button/button.props';
import {getButtonAttrs} from '~/components/elements/button/Button.styled';

export const Button = memo((props: ButtonProps) => {
  const {containerStyle, background, children, variant, type = 'solid', ...rest} = props;

  const spacingStyle = useSpacingStyle(rest);
  const passProps = {containerStyle: [containerStyle, spacingStyle], type, variant, ...rest};

  return <BaseButton {...getButtonAttrs(passProps)} />;
});
