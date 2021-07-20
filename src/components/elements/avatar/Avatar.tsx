import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {Avatar as BaseAvatar} from 'react-native-elements';
import {AvatarProps} from '~/components/elements/avatar/avatar.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {Col} from '../grid/Col';
import {color} from '~/theme';
import {getColorByChar, getShortName, isSvgUri} from '~/utils/helpers';

const styles = StyleSheet.create({
  container: {marginVertical: 15, borderWidth: 0.5, borderColor: color.palette.lightGrey},
  placeholder: {backgroundColor: 'yellow'},
});

export const Avatar = memo(({uri, title, containerStyle, size, ...rest}: AvatarProps) => {
  const spacingStyle = useSpacingStyle(rest);

  const placeholderContent = title ? undefined : <ActivityIndicator />;
  const autoFillOverlay = title && !uri;
  const overlayColor = autoFillOverlay ? getColorByChar(title) : 'white';
  const titleColor = autoFillOverlay ? 'white' : color.palette.lightGrey;

  return isSvgUri(uri || '') ? (
    <Col style={[styles.container, spacingStyle, {width: size, height: size}, containerStyle]}>
      <SvgUri width="100%" height="100%" uri={uri || null} />
    </Col>
  ) : (
    <BaseAvatar
      rounded
      source={uri ? {uri} : undefined}
      renderPlaceholderContent={placeholderContent}
      title={getShortName(title)}
      titleStyle={[{color: titleColor}]}
      overlayContainerStyle={[{backgroundColor: overlayColor}]}
      placeholderStyle={[styles.placeholder, {backgroundColor: overlayColor}]}
      containerStyle={[styles.container, spacingStyle, {...(autoFillOverlay ? {borderWidth: 0} : {})}, containerStyle]}
      imageProps={{resizeMode: 'contain'}}
      size={size}
      {...rest}
    />
  );
});
