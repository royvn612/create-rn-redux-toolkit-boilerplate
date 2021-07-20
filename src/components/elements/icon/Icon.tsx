import React, {memo} from 'react';
import {ImageSourcePropType, View} from 'react-native';
import {Icon as BaseIcon, ImageProps} from 'react-native-elements';
import styled, {css} from 'styled-components';
import theme from 'styled-theming';
import {icons, IconTypes} from '~/components/elements/icon/icons';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {IconProps} from '~/components/elements/icon/icon.props';
import {color as themeColor, THEME_KEYS, THEME_NAMES} from '~/theme';
import {Image} from '~/components/elements/image/Image';

const cssStyle = theme(THEME_KEYS.NAME, {
  [THEME_NAMES.LIGHT]: (p: {width?: number; height?: number}) => css`
    width: ${p.width || 20}px;
    height: ${p.height || 20}px;
  `,
});

const StyledImage = styled(Image).attrs(props => ({}))`
  ${cssStyle}
`;

export const Icon = memo(
  ({containerStyle, name, type, onPress, size, width, height, color = themeColor.primaryBackground, ...rest}: IconProps) => {
    const spacingStyle = useSpacingStyle(rest);
    if (type !== 'image') {
      return (
        <BaseIcon
          name={name}
          type={type}
          onPress={onPress}
          color={color}
          containerStyle={[containerStyle, spacingStyle]}
          size={size}
          {...rest}
        />
      );
    }

    const source: ImageSourcePropType = icons[name as IconTypes] || name;
    const imageWidth = width || size;
    const imageHeight = height || size;
    return (
      <View style={[containerStyle, spacingStyle]}>
        <StyledImage
          source={source}
          width={imageWidth}
          height={imageHeight}
          onPress={onPress}
          resizeMode="contain"
          {...(rest as Omit<ImageProps, 'source'>)}
        />
      </View>
    );
  },
);
