import {CardProps as BaseCardProps} from 'react-native-elements';
import React from 'react';
import {BaseProps} from '~/components/base.props';

export interface CardProps extends BaseCardProps, BaseProps {
  variant?: 'default';
  shadow?: boolean;
  children?: React.ReactNode;
}
