import * as Linking1 from 'expo-linking';

import { Linking, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { Button } from '@muratoner/semantic-ui-react-native';
import  LoginForm  from '../features/user/LoginForm';
import RegisterForm from '../features/user/RegisterForm';
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";
import { EkvitiColors } from '../layout/EkvitiColors';

const styles = StyleSheet.create({});

const WelcomeScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text style={{ fontSize: 48 }}>Welcome screen</Text>
      <Button
        style={{ justifyContent: "center", alignItems: "center",backgroundColor: EkvitiColors.primary }}
        title="Prijavi se"
        onPress={() => openModal(<LoginForm />)}
      />
      <Button 
      style={{backgroundColor: EkvitiColors.primary}}
      title="Register"  onPress={() => openModal(<RegisterForm />)} />
    </View>
  );
};

export default observer(WelcomeScreen);