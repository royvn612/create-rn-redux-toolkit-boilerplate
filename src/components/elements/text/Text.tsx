import React, {memo} from 'react';
import {Text as BaseText} from 'react-native-elements';
import {TextProps} from '~/components/elements/text/text.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {getTextAttrs} from '~/components/elements/text/Text.styled';

export const Text = memo(({text, style: style1, children, ...rest}: TextProps) => {
  const spacingStyle = useSpacingStyle(rest);
  const content = text || children;

  return <BaseText {...getTextAttrs({style: [style1, spacingStyle], ...rest})}>{content}</BaseText>;
});
