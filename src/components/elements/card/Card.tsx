import React, {memo} from 'react';
import {Card as BaseCard} from 'react-native-elements';
import {CardProps} from '~/components/elements/card/card.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {styledPropsTheming} from '~/utils/styled-props-theming';
import {color, THEME_NAMES} from '~/theme';

const variantStyled = {
  default: {[THEME_NAMES.LIGHT]: {}},
};
export const getCardAttrs = (p: CardProps) => {
  const {containerStyle, shadow} = p;
  const {variants} = styledPropsTheming(p);
  const variantStyle = variants('variant', variantStyled);

  const overrideContainerStyle = {
    ...(shadow
      ? {
          shadowColor: color.shadow,
          shadowOffset: {height: 0, width: 5},
          shadowOpacity: 1,
          shadowRadius: 16,
          elevation: 5,
        }
      : {shadowColor: 'transparent'}),
  };

  return {
    containerStyle: [variantStyle.containerStyle, overrideContainerStyle, containerStyle],
  };
};

export const Card = memo((props: CardProps) => {
  const {containerStyle, variant = 'default', shadow = true, children, ...rest} = props;
  const spacingStyle = useSpacingStyle(rest);
  const passProps = {containerStyle: [containerStyle, spacingStyle], variant, shadow, ...rest};
  return <BaseCard {...getCardAttrs(passProps)}>{children}</BaseCard>;
});
