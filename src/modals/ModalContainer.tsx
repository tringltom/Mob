import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import  Modal from "react-native-modal";
import { RootStoreContext } from "../stores/rootStore";
import { Text, View, StyleSheet, Button } from 'react-native';

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body},
    closeModal, 
  } = rootStore.modalStore;

  const styles = StyleSheet.create({
    view: {
      justifyContent: 'center',
      margin: 0,
      flex: 1, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', height: '20%'
    },
  });

  return (
    <Modal 
    isVisible={open} 
    animationIn="zoomIn"
    animationOut="zoomOut"
    style={styles.view}
    onBackdropPress={closeModal}
    onBackButtonPress={closeModal}
    >
      <>
      {body}
      </>
    </Modal>
  );
};

export default observer(ModalContainer);
