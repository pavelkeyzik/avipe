import { css } from "@emotion/react";
import styled from "@emotion/styled";

function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <Root>
      <InputBase {...props} />
    </Root>
  );
}

const Root = styled.div(
  ({ theme }) => css`
    display: flex;
    min-height: 56px;
    border: 2px solid ${theme.input.border};
    border-radius: 8px;

    &:focus-within {
      border-color: ${theme.input.borderFocus};
    }
  `
);

const InputBase = styled.input(
  ({ theme }) => css`
    display: flex;
    flex-grow: 1;
    font-family: inherit;
    background: none;
    border: none;
    padding: 0 16px;
    outline: none;
    color: ${theme.input.foreground};
  `
);

export { Input };
