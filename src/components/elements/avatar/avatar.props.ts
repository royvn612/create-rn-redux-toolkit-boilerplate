import {AvatarProps as BaseAvatarProps} from 'react-native-elements';
import {BaseProps} from '~/components/base.props';

export interface AvatarProps extends BaseAvatarProps, BaseProps {
  uri?: string;
}
