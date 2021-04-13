import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ContentWidth = styled.div(
  ({ theme }) => css`
    width: 100%;
    padding: 0 ${theme.contentPadding};
  `
);

export { ContentWidth };
