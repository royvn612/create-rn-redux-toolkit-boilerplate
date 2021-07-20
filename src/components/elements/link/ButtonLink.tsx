import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {ButtonLinkProps} from '~/components/elements/link/button-link.props';
import {Button} from '~/components/elements';
import {color} from '~/theme';

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: 10,
    height: undefined,
  },
  titleStyle: {
    color: color.textLighter,
  },
});

export const ButtonLink = memo(({fontSize = 14, ...rest}: ButtonLinkProps) => (
  <Button type="clear" fontSize={fontSize} buttonStyle={styles.buttonStyle} titleStyle={styles.titleStyle} {...rest} />
));
