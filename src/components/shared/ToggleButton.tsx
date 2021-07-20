import React, {memo} from 'react';
import styled from 'styled-components';
import {Button, Col, Text} from '~/components/elements';
import {TextProps} from '~/components/elements/text/text.props';
import {color} from '~/theme';
import {ButtonProps} from '~/components/elements/button/button.props';

const ButtonTitleContainer = styled(Col.TB)``;
const ButtonText = styled(Text).attrs<TextProps & {selected: boolean}>(p => ({
  textAlign: 'center',
  color: p.selected ? color.palette.white : color.text,
}))<TextProps & {selected: boolean}>``;

interface Props extends ButtonProps {
  description?: string;
  selected: boolean;
  size?: 'big' | 'normal';
}

export const ToggleButton = memo(({title, selected, size = 'big', buttonStyle, description = '', ...rest}: Props) => {
  const Title = React.isValidElement(title) ? (
    title
  ) : (
    <ButtonTitleContainer my={size === 'big' ? 2 : 0}>
      <ButtonText
        text={title}
        weight="semiBold"
        variant={size === 'big' ? 'default' : 'small'}
        selected={selected}
        mb={description ? 2 : 0}
      />
      {!!description && <ButtonText text={description} variant="small" textAlign="center" selected={selected} />}
    </ButtonTitleContainer>
  );
  return (
    <Button
      variant="toggle"
      selected={selected}
      my={2}
      buttonStyle={[buttonStyle]}
      title={Title}
      {...rest}
    />
  );
});
