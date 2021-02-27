import * as React from "react";
import { Modal as DefaultModal } from "react-native";
import styled from "styled-components";

import { SetState } from "../../screens/chat/Chats";
import Button from "../button/Button";
import { View } from "../theme";

interface ModalProps {
  visible: boolean;
  setVisible: SetState<boolean>;
}

const Modal: React.FC<ModalProps> = ({ children, setVisible, visible }) => {
  return (
    <DefaultModal
      statusBarTranslucent={true}
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => setVisible((prev) => !prev)}
    >
      <Container onPress={() => setVisible((prev) => !prev)}>
        {children}
      </Container>
    </DefaultModal>
  );
};

const Container = styled(Button)({
  backgroundColor: "#000",
  opacity: 1,
  position: "absolute",
  width: "100%",
  height: "100%",
});

export default Modal;
