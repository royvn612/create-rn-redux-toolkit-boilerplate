import {InputProps as BaseInputProps} from 'react-native-elements';
import {BaseProps} from '~/components/base.props';

export interface FieldInputProps extends BaseInputProps, BaseProps {
  variant?: 'default';
  isFocused?: boolean;
  isPassword?: boolean;
}
