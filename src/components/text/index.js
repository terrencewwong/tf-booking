// @flow
import styled, { css } from 'styled-components'

const FONT_SIZES = {
  size0: css`
    font-size: 14px;
    line-height: 3;
  `,
  size1: css`
    font-size: 16px;
    line-height: 1.5;
  `,
  size2: css`
    font-size: 24px;
    line-height: 1.5;
  `
}


export default styled.span`
  margin: 0;
  ${({ size }) => FONT_SIZES[size]}
`
