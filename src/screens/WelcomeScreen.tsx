import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/rootStore";
import  LoginForm  from '../features/user/LoginForm';
import { Button } from '@muratoner/semantic-ui-react-native';

const styles = StyleSheet.create({});

const WelcomeScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <>
      <Text style={{ fontSize: 48 }}>Welcome screen</Text>
      <Button
        style={{ justifyContent: "center", alignItems: "center" }}
        title="Prijavi se"
        color="primary"
        onPress={() => openModal(<LoginForm />)}
      />
      <Button title="Register" color="primary" onPress={() => register} />
    </>
  );
};

export default observer(WelcomeScreen);