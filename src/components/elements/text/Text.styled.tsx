import React from 'react';
import {Platform} from 'react-native';
import {TextProps} from '~/components/elements/text/text.props';
import {color as themeColor, THEME_NAMES, typography} from '~/theme';
import {styledPropsTheming} from '~/utils/styled-props-theming';

const styleByVariant: Record<string, Record<string, TextProps>> = {
  titleX: {[THEME_NAMES.LIGHT]: {style: {fontSize: 30, fontWeight: 'bold'}}}, // fixed!
  title: {[THEME_NAMES.LIGHT]: {style: {fontSize: 24, fontWeight: '700'}}}, // fixed!
  subtitle: {[THEME_NAMES.LIGHT]: {style: {fontSize: 20, fontWeight: '600'}}}, // fixed!
  heading: {[THEME_NAMES.LIGHT]: {style: {fontSize: 18, fontWeight: '600'}}}, // fixed!
  subheading: {[THEME_NAMES.LIGHT]: {style: {fontSize: 16, fontWeight: '600'}}}, // fixed!
  default: {[THEME_NAMES.LIGHT]: {style: {fontSize: 14}}}, // fixed!
  small: {[THEME_NAMES.LIGHT]: {style: {fontSize: 12}}}, // fixed!
  mini: {[THEME_NAMES.LIGHT]: {style: {fontSize: 10}}},
  fieldLabel: {[THEME_NAMES.LIGHT]: {style: {fontSize: 13, color: themeColor.dim}}},
};

export const getTextAttrs = (p: TextProps) => {
  const {style, weight, color, alignSelf, textAlign, ...rest} = p;
  const {variants} = styledPropsTheming(p);
  const variantStyle = variants<TextProps>('variant', styleByVariant);
  let fontWeight = weight === 'semiBold' ? '600' : weight;
  fontWeight = fontWeight || variantStyle?.style?.fontWeight || '400';
  let fontFamily;

  if (Platform.OS === 'android') {
    fontFamily = typography.fontWeightMap[fontWeight!];
  }

  const overrideStyle = {
    ...(color && {color}),
    ...(fontWeight && {fontWeight}),
    ...(fontFamily && {fontFamily}),
    alignSelf: alignSelf || 'auto',
    textAlign: textAlign || 'auto',
  };

  return {
    style: [variantStyle.style, overrideStyle, style],
    ...rest,
  };
};
