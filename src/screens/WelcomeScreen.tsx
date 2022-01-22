import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../stores/rootStore";
import { LoginForm } from '../features/user/LoginForm';
import { Button } from '@muratoner/semantic-ui-react-native';
import RegisterForm from '../features/user/RegisterForm';

const styles = StyleSheet.create({});

const WelcomeScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;

  return (
    <>
      <Text style={{ fontSize: 48 }}>Welcome screen</Text>
      <Button
        title="Sign in"
        color="primary"
        onPress={() => openModal(<LoginForm />)}
      />
      <Button title="Register" color="primary" onPress={() => openModal(<RegisterForm />)} />
    </>
  );
};

export default observer(WelcomeScreen);