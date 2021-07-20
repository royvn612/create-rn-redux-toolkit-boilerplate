import React, {memo} from 'react';
import {Divider as BaseDivider} from 'react-native-elements';
import {DividerProps} from '~/components/elements/divider/divider.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {Text} from '~/components/elements/text/Text';
import {Row} from '../grid/Row';

export const Divider = memo(({text, textStyle, textProps, style, ...rest}: DividerProps) => {
  const spacingStyle = useSpacingStyle(rest);
  if (!text) {
    return <BaseDivider style={[spacingStyle, style]} {...rest} />;
  }
  const dividerStyle: DividerProps['style'] = [{flex: 1, alignSelf: 'center'}, style];
  return (
    <Row style={spacingStyle}>
      <BaseDivider style={dividerStyle} {...rest} />
      <Text alignSelf="center" weight="bold" mx={2} style={textStyle} {...textProps}>
        {text}
      </Text>
      <BaseDivider style={dividerStyle} {...rest} />
    </Row>
  );
});
