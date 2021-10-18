import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from '@muratoner/semantic-ui-react-native';
import { RootStoreContext } from "../stores/rootStore";

const styles = StyleSheet.create({});

const ArenaScreen = () => {

  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;

    return (
      <>
        <Text style={{ fontSize: 48 }}>Arena Screen</Text>
        <Button title='Log out' onPress={logout}></Button>
      </>
    );
};

export default ArenaScreen;