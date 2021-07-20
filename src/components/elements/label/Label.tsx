import React, {memo} from 'react';
import styled from 'styled-components';
import {LabelProps} from '~/components/elements/label/label.props';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {Circle} from '~/components/elements/circle/Circle';
import {Row} from '~/components/elements/grid/Row';
import {Icon} from '~/components/elements/icon/Icon';
import {Text} from '~/components/elements/text/Text';

const StyledLabel = styled(Row.C).attrs<LabelProps>(p => {})<LabelProps>`
  padding: 1px 1px;
  margin: 1px 1px;
`;

export const Label = memo(
  ({style, text, iconProps, variant = 'default', iconPosition = 'left', size = 'small', ...rest}: LabelProps) => {
    const spacingStyle = useSpacingStyle(rest);
    let IconCpn: (arg0: any) => any = () => null;
    if (variant === 'annotation') {
      IconCpn = (props: any) => <Circle color={iconProps!.color} {...props} />;
    } else if (iconProps) {
      IconCpn = (props: any) => <Icon {...iconProps} {...props} />;
    }

    return (
      <StyledLabel style={[style, spacingStyle]} variant={variant} size={size} {...rest}>
        {iconPosition === 'left' && <IconCpn mr={2} />}
        <Text text={text} variant="small" />
        {iconPosition === 'right' && <IconCpn ml={2} />}
      </StyledLabel>
    );
  },
);
