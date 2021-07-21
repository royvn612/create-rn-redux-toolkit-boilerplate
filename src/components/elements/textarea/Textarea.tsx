import React, {memo} from 'react';
import {TextareaProps} from '~/components/elements/textarea/textarea.props';
import {Input} from '~/components/elements/input/Input';
import {color, componentPaddingX, sharedStyles, THEME_NAMES} from '~/theme';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {styledPropsTheming} from '~/utils/styled-props-theming';

const styles = {
  [THEME_NAMES.LIGHT]: (p: TextareaProps) => ({
    inputContainerStyle: {
      paddingTop: 8,
      borderWidth: 1,
      borderColor: color.line,
      backgroundColor: color.palette.white,
      borderRadius: 10,
      paddingHorizontal: componentPaddingX,
    },
    inputStyle: {textAlignVertical: 'top', height: p.height},
  }),
};

export const Textarea = memo(({containerStyle, height = 200, ...rest}: TextareaProps) => {
  const spacingStyle = useSpacingStyle(rest);
  const {themeBy} = styledPropsTheming({height, ...rest});
  const styled = themeBy(styles);
  return (
    <Input
      containerStyle={[sharedStyles.flexX, containerStyle, spacingStyle]}
      inputContainerStyle={[styled.inputContainerStyle]}
      inputStyle={[styled.inputStyle]}
      multiline
      {...rest}
    />
  );
});
