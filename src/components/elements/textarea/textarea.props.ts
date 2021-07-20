import {StyleProp, ViewStyle} from 'react-native';
import {BaseProps} from '~/components/base.props';
import {InputProps} from '~/components/elements/input/input.props';

export interface TextareaProps extends InputProps, BaseProps {
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
}
