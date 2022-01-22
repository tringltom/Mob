import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Modal from "react-native-modal";
import { RootStoreContext } from "../stores/rootStore";
import { View, StyleSheet } from 'react-native';
import Container from "toastify-react-native";

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal,
  } = rootStore.modalStore;

  const styles = StyleSheet.create({
    content: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    view: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <Modal
      style={styles.view}
      isVisible={open}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={rootStore.allowEvents ? closeModal : () => {}}
      onBackButtonPress={closeModal}
    >
      <View pointerEvents={rootStore.allowEvents ? "auto" : "none"} style={styles.content}>{body}</View>
    </Modal>
  );
};

export default observer(ModalContainer);
