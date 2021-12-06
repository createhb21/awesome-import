/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import React, { useState } from 'react';
import palette from '../../lib/palette';
import AwesomeIcon, { AwesomeIconType } from '../Awesomecon/Awesomecon';

export type ThemeChangeBtnProps = {
  icon: AwesomeIconType;
  text?: string;
};

function ThemeChangeBtn({ icon, text }: ThemeChangeBtnProps) {
  const [colorful, setColorful] = useState(true);

  const changeThemeColor = () => {
    colorful === false ? setColorful(true) : setColorful(false);
  };
  return (
    <div css={buttonStyle(colorful)} onClick={changeThemeColor}>
      <AwesomeIcon name={icon} className="react" />
    </div>
  );
}

export default ThemeChangeBtn;

const react_spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const buttonStyle = (colorful: boolean) => css`
  position: fixed;
  top: 2.7rem;
  right: 16.5rem;
  width: 5.5rem;
  height: 5.5rem;
  cursor: pointer;
  opacity: ${colorful ? 1 : 0.3};

  .react {
    animation: ${react_spin} infinite 20s linear;
  }

  &:hover {
  }

  &.active {
    color: ${palette.cyan[600]};
    border-radius: 0.25rem;
  }
`;
