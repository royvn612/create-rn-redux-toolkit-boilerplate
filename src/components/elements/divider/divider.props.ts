import {DividerProps as BaseDividerProps} from 'react-native-elements';
import {StyleProp, TextStyle} from 'react-native';
import {BaseProps} from '~/components/base.props';
import {TextProps} from '~/components/elements/text/text.props';

export interface DividerProps extends BaseDividerProps, BaseProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  textProps?: TextProps;
}
