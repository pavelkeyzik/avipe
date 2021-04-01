import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type ModalProps = {
  visible?: boolean;
};

const variants = {
  hidden: { opacity: 0, y: "30px" },
  visible: { opacity: 1, y: 0 },
};

const variantsBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Modal(props: PropsWithChildren<ModalProps>) {
  const { children, ...rest } = props;

  if (!props.visible) {
    return null;
  }

  return (
    <RootContainer
      initial="hidden"
      animate="visible"
      variants={variantsBackdrop}
      {...rest}
    >
      <ModalContent initial="hidden" animate="visible" variants={variants}>
        {props.children}
      </ModalContent>
    </RootContainer>
  );
}

const RootContainer = styled(motion.div)<ModalProps>(
  ({ theme, visible }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: ${theme.layerManager.modals};
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);

    ${visible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}
  `
);

const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: #2d2d35;
  padding: 16px 32px 32px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  min-height: 200px;
`;

export { Modal };
