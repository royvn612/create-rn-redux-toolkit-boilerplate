import React from 'react';
import {Row as BaseRow, RowComponent} from 'react-native-col';
import {isFunction, isString} from 'lodash';
import {ViewProps} from 'react-native';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {BaseProps} from '~/components/base.props';

export interface RowProps extends BaseProps, ViewProps {}

const wrapView =
  (component: any): RowComponent<RowProps> =>
  // @ts-ignore
  ({style, ...rest}: RowProps) => {
    const Container = component;
    const spacingStyle = useSpacingStyle(rest);
    const newStyle = [style, spacingStyle];
    return <Container style={newStyle} {...rest} />;
  };
const CustomRow = wrapView(BaseRow);

Object.entries(BaseRow).forEach(property => {
  const [name, value] = property;
  if (isString(name) && isFunction(value)) {
    // @ts-ignore
    CustomRow[name] = wrapView(value);
    // @ts-ignore
    CustomRow[name].X = wrapView(value.X);
  }
});

export const Row = CustomRow;
