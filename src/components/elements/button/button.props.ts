import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {ButtonProps as BaseButtonProps} from 'react-native-elements';
import {BaseProps} from '~/components/base.props';

export interface ButtonProps extends BaseButtonProps, BaseProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  variant?: 'primary' | 'secondary' | 'white' | 'toggle';
  color?: string;
  border?: boolean;
  fontWeight?: string;
  fontSize?: number;

  /*
   * An optional style for variant: toggle
   */
  selected?: boolean;
}
