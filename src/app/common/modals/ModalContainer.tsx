import React, { useContext } from "react";
import { StyleSheet, View } from 'react-native';

import Modal from "react-native-modal";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";
import { useTailwind } from "tailwind-rn/dist";

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal,
  } = rootStore.modalStore;

  const tailwind = useTailwind();

  return (
    <Modal
      style={tailwind('justify-center items-center')}
      isVisible={open}
      animationIn="zoomIn"
      animationOut="zoomOut"      
      onBackdropPress={rootStore.allowEvents ? closeModal : () => {}}
      onBackButtonPress={closeModal}
    >
      <View pointerEvents={rootStore.allowEvents ? "auto" : "none"} style={tailwind('bg-white rounded-2xl justify-center items-center p-6')}>{body}</View>
    </Modal>
  );
};

export default observer(ModalContainer);
