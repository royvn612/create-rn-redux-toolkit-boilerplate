import {IconProps as BaseIconProps} from 'react-native-elements';
import {BaseProps} from '~/components/base.props';
import {IconTypes} from '~/components/elements/icon/icons';

export interface IconProps extends BaseIconProps, BaseProps {
  name: IconTypes | string;
  width?: number;
  height?: number;
  onPress?: any;
}
