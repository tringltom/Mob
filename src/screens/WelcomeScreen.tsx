import * as Linking1 from 'expo-linking';

import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import { Button } from '@muratoner/semantic-ui-react-native';
import { LoginForm } from '../features/user/LoginForm';
import RegisterForm from '../features/user/RegisterForm';
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";

const styles = StyleSheet.create({});

const WelcomeScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 48 }}>Welcome screen</Text>
      <Button
        title="Sign in"
        color="primary"
        onPress={() => openModal(<LoginForm />)}
      />
      <Button title="Register" color="primary" onPress={() => openModal(<RegisterForm />)} />
    </View>
  );
};

export default observer(WelcomeScreen);