import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ArenaScreen from './src/screens/ArenaScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStoreContext } from './src/stores/rootStore';
import { observer } from 'mobx-react-lite';


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
const { user } = rootStore.userStore;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: user ? "pop" : "push",
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="MainScreen" component={MainScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default observer(App);
