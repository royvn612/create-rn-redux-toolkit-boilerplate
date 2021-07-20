import {ButtonProps} from '~/components/elements/button/button.props';
import {color, THEME_NAMES} from '~/theme';
import {styledPropsTheming} from '~/utils/styled-props-theming';

const baseButtonStyled = (p: ButtonProps) => ({
  ...(p.type === 'outline' && {borderWidth: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)'}),
  ...(p.border && {borderWidth: 1, borderColor: 'white'}),
});
const styleByVariant = {
  primary: {
    [THEME_NAMES.LIGHT]: (p: ButtonProps) => ({
      buttonStyle: {
        backgroundColor: color.palette.outerSpace,
      },
      titleStyle: {},
      loadingProps: {},
    }),
  },
  secondary: {
    [THEME_NAMES.LIGHT]: (p: ButtonProps) => ({
      buttonStyle: {backgroundColor: color.secondaryBackground},
      titleStyle: {color: color.textLighter},
      loadingProps: {},
    }),
  },
  white: {
    [THEME_NAMES.LIGHT]: (p: ButtonProps) =>
      p.type === 'outline'
        ? {
            buttonStyle: {borderColor: color.palette.white},
            titleStyle: {color: color.palette.white},
            loadingProps: {color: color.palette.white},
          }
        : {
            buttonStyle: {backgroundColor: color.palette.white, borderColor: color.primaryBackground},
            titleStyle: {color: color.text},
            loadingProps: {color: color.palette.black},
          },
  },
  toggle: {
    [THEME_NAMES.LIGHT]: (p: ButtonProps) => ({
      buttonStyle: {
        borderRadius: 50,
        borderColor: color.primaryBackground,
        ...(p.selected ? {backgroundColor: color.primaryBackground} : {backgroundColor: color.unSelected}),
      },
      titleStyle: {
        color: p.selected ? color.palette.white : color.text,
      },
      loadingProps: {},
    }),
  },
};

export const getButtonAttrs = (p: ButtonProps) => {
  const {buttonStyle, titleStyle, loadingProps, type, border, fontSize, fontWeight, ...rest} = p;
  const {variants} = styledPropsTheming(p);
  const variantStyle = variants<ButtonProps>('variant', styleByVariant);

  const overrideTitleStyle = {
    ...(fontSize && {fontSize}),
    ...(fontWeight && {fontWeight}),
  };
  return {
    buttonStyle: [baseButtonStyled({type, border}), variantStyle.buttonStyle, buttonStyle],
    titleStyle: [variantStyle.titleStyle, overrideTitleStyle, titleStyle],
    loadingProps: {...variantStyle.loadingProps, ...(loadingProps || {})}, // This one does not support array. Haven' check yet
    type,
    ...rest,
  };
};
