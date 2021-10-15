import React, { useContext } from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/rootStore";
import Container from "toastify-react-native";

const styles = StyleSheet.create({});

const WelcomeScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { login, register } = rootStore.userStore;

  return (
    <>
      <Container position="bottom-right"/>
      <Text style={{ fontSize: 48 }}>Welcome screen</Text>
      <Button title="Sign in" onPress={login} />
      <Button title="Register" onPress={register} />
    </>
  );
};

export default observer(WelcomeScreen);