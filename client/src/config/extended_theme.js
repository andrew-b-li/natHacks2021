import Gradient from 'javascript-color-gradient';
import * as H from 'utils/helpers';
import styled, { css, keyframes } from 'styled-components';
import 'styled-components/macro';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';

export const colors = {
  white: '#ffffff',
  text: '#231F20',
  bg: '#EAEAEA',
  red: '#FF5452',
  brown: '#322D2A',
  pink: '#EFC6C0',
  blue: '#5551FF',
  iris: '#00AFB9',
  lightblue: '#BCE7FD',
  grey: '#EDEDED',
  lightgrey: '#F3F4F4',
  textgrey: darken(0.4, '#EDEDED'),
  darkgrey: '#51585B',
  yellow: '#FFC852',
  green: '#52FFAB',
};

export const easings = {
  default: [0.6, -0.05, 0.01, 0.99],
};

export class StylingFunctions {
  card(props) {
    const generalCss = css`
      // ---------------- General ----------------
      border-radius: ${props.br && isNaN(props.br)
        ? props.br
        : (props.br ?? 10) + 'px'};
      background: ${props.background || props.bg || 'initial'};
    `;

    const defaultOptions = css`
      position: relative;
      width: auto;
      height: 100%;
      display: flex;
      flex-direction: column;
    `;

    const paper1Variant = css`
      box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
        0 15px 40px rgba(166, 173, 201, 0.2);
    `;

    const paper2Variant = css`
      box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
    `;

    let returnCss = [generalCss];

    if (props.default) returnCss.push(defaultOptions);
    if (props.variant === 'paper-1') returnCss.push(paper1Variant);
    if (props.variant === 'paper-2') returnCss.push(paper2Variant);
    return returnCss;
  }
}
