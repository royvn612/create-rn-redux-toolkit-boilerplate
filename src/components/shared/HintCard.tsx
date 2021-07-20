import React, {memo} from 'react';
import {Card, Col, Icon, Row, Text} from '~/components/elements';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {BaseProps} from '~/components/base.props';
import {CardProps} from '~/components/elements/card/card.props';
import {IconProps} from '~/components/elements/icon/icon.props';
import {color} from '~/theme';

interface HintCardProps extends CardProps, BaseProps {
  iconProps: IconProps;
  title: string;
  description?: string;
  bgColor?: string;
}

export const HintCard = memo(
  ({iconProps, title, description, containerStyle, bgColor = color.palette.white, ...rest}: HintCardProps) => {
    const spacingStyle = useSpacingStyle(rest);
    return (
      <Card containerStyle={[{backgroundColor: bgColor}, containerStyle, spacingStyle]}>
        <Row.C>
          <Col>
            <Icon width={45} height={45} {...iconProps} />
          </Col>
          <Col.X ml={3}>
            <Text text={title} weight="semiBold" />
            {!!description && <Text text={description} variant="small" mt={1} />}
          </Col.X>
        </Row.C>
      </Card>
    );
  },
);
