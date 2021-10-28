import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ArenaScreen from './src/screens/ArenaScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStoreContext } from './src/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ModalContainer from './src/modals/ModalContainer';
import { navigationRef } from './src/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ArenaScreen" component={ArenaScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { token, setToken} = rootStore.commonStore;

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    async function getToken() {
      await AsyncStorage.getItem("jwt").then((res) => {
        setToken(res);
        setAppLoaded(true);
      });
    }
    setAppLoaded(false);
    getToken();
  }, []);

  return !appLoaded ? (
    <View style={styles.container}>
    <Text>Loading</Text>
    </View>
  ) : (
    <NavigationContainer ref={navigationRef}>
      <ModalContainer />
      <Stack.Navigator>
        {token == null ? (
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: "Sign in",
            }}
          />
        ) : (
          <Stack.Screen name="MainScreen" component={MainScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default observer(App);
