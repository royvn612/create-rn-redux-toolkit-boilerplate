import React from 'react';
import BaseCol, {ColComponent} from 'react-native-col';
import {isFunction, isString} from 'lodash';
import {ViewProps} from 'react-native';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {BaseProps} from '~/components/base.props';

export interface ColProps extends BaseProps, ViewProps {}

const wrapView =
  (component: any): ColComponent<ColProps> =>
  // @ts-ignore
  ({style, ...rest}: ColProps) => {
    const Container = component;
    const spacingStyle = useSpacingStyle(rest);
    const newStyle = [style, spacingStyle];
    return <Container style={newStyle} {...rest} />;
  };
const CustomCol = wrapView(BaseCol);

Object.entries(BaseCol).forEach(property => {
  const [name, value] = property;
  if (isString(name) && isFunction(value)) {
    // @ts-ignore
    CustomCol[name] = wrapView(value);
    // @ts-ignore
    CustomCol[name].X = wrapView(value.X);
  }
});

export const Col = CustomCol;
