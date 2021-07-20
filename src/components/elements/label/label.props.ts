import {ColProps} from '~/components/elements';
import {IconProps} from '../icon/icon.props';

export interface LabelProps extends ColProps {
  variant?: 'default' | 'annotation';
  size?: 'mini' | 'small' | 'big' | 'large';
  iconProps?: Partial<IconProps>;
  iconPosition?: 'left' | 'right';
  text?: string;
}
