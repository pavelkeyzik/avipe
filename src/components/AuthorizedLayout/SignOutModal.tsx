import styled from "@emotion/styled";
import { Button, Modal, Typography } from "../../design-system";

type SignOutModalProps = {
  visible?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
};

function SignOutModal(props: SignOutModalProps) {
  return (
    <Modal visible={props.visible}>
      <Typography.H1>Sign Out</Typography.H1>
      <Typography.P>Are you sure you want to Sign Out?</Typography.P>
      <ModalContent>
        <Button variant="outlined" shape="square" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button shape="square" onClick={props.onOk}>
          Sign Out
        </Button>
      </ModalContent>
    </Modal>
  );
}

const ModalContent = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export { SignOutModal };
