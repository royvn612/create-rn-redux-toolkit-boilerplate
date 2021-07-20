import React, {memo} from 'react';
import styled from 'styled-components';
import {Avatar, Col, Row, RowProps, Text} from '~/components/elements';
import {useSpacingStyle} from '~/hooks/useSpacingStyle';
import {BaseProps} from '~/components/base.props';
import {color, componentPaddingX, spacing} from '~/theme';

interface MessageListProps extends RowProps, BaseProps {
  message: string;
  user: {avatar?: string};
}

const Message = styled(Col.X).attrs({
  paddingHorizontal: componentPaddingX,
  paddingVertical: spacing[4],
  borderRadius: 16,
  borderBottomLeftRadius: 0,
})`
  background: ${color.secondaryBackground};
`;

export const MessageList = memo(({message, user, ...rest}: MessageListProps) => {
  const spacingStyle = useSpacingStyle(rest);
  return (
    <Row.X style={[spacingStyle]}>
      <Col.B mr={2}>
        <Avatar
          size={40}
          rounded
          source={{
            uri: user.avatar,
          }}
        />
      </Col.B>
      <Message>
        <Text text={message} />
      </Message>
    </Row.X>
  );
});
