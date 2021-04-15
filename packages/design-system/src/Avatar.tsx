import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { UserIcon } from './icons';

type AvatarProps = {
  variant: 'small' | 'large';
  src?: string;
};

function Avatar(props: React.PropsWithChildren<AvatarProps>) {
  return (
    <Root variant={props.variant}>
      {props.src ? <img src={props.src} alt="User Logo" /> : <UserIcon />}
    </Root>
  );
}

const Root = styled.div<AvatarProps>(
  ({ theme, variant }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    border-radius: 50%;
    background: ${theme.avatar.background};
    overflow: hidden;

    ${variant === 'large'
      ? css`
          width: 128px;
          height: 128px;
        `
      : css`
          width: 48px;
          height: 48px;
        `}

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `
);

Avatar.defaultProps = {
  variant: 'small',
};

export { Avatar };
