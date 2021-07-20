import styled, {css} from 'styled-components';
import theme from 'styled-theming';
import {THEME_KEYS, THEME_NAMES} from '~/theme';
import {Col} from '~/components/elements/grid/Col';

const cssStyle = theme(THEME_KEYS.NAME, {
  [THEME_NAMES.LIGHT]: (p: {color?: string}) => css`
    border-radius: 100px;
    background: ${p.color || '#000'};
    width: 13px;
    height: 13px;
  `,
});

export const Circle = styled(Col)<{color?: string}>`
  ${cssStyle}
`;
