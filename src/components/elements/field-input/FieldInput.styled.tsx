import {FieldInputProps} from '~/components/elements/field-input/field-input.props';
import {color, componentPaddingX, THEME_NAMES} from '~/theme';
import {styledPropsTheming} from '~/utils/styled-props-theming';

const defaultInputContainerStyled = {
  [THEME_NAMES.LIGHT]: (p: FieldInputProps) => ({
    borderWidth: 1,
    borderColor: p.isFocused ? color.palette.fadedJade : color.line,
    backgroundColor: color.palette.white,
    borderRadius: 10,
    paddingHorizontal: componentPaddingX,
  }),
};

export const getFieldInputAttrs = (p: FieldInputProps) => {
  const {isFocused, ...rest} = p;
  const {themeBy} = styledPropsTheming({isFocused});
  const inputContainerStyle = themeBy(defaultInputContainerStyled);
  return {
    inputStyle: [{fontSize: 14}],
    inputContainerStyle: [inputContainerStyle],
    ...rest,
  };
};
