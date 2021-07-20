import React from 'react';
import {TextStyle} from 'react-native';
import {TextProps as BaseTextProps} from 'react-native-elements';
import {BaseProps} from '~/components/base.props';

export interface TextProps extends BaseTextProps, BaseProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: BaseTextProps['style'];

  /**
   * One of the different types of text presets.
   */
  variant?: 'titleX' | 'title' | 'subtitle' | 'heading' | 'subheading' | 'default' | 'fieldLabel' | 'small' | 'mini';

  color?: string;
  alignSelf?: string;
  textAlign?: string;
  weight?: TextStyle['fontWeight'] | 'semiBold';
}
