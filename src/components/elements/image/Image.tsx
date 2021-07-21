import React, {memo} from 'react';
import {Image as BaseImage} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {ImageProps} from '~/components/elements/image/image.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';

export const Image = memo(({containerStyle, ...rest}: ImageProps) => {
  const spacingStyle = useSpacingStyle(rest);

  // @ts-ignore
  return <BaseImage containerStyle={[containerStyle, spacingStyle]} PlaceholderContent={<ActivityIndicator />} {...rest} />;
});
