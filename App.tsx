import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View , LogBox} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import ArenaScreen from './src/screens/ArenaScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStoreContext } from './src/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ModalContainer from './src/modals/ModalContainer';
import { navigationRef } from './src/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoodDeedForm from './src/features/activities/GoodDeedForm';
import JokeForm from './src/features/activities/JokeForm';
import QuoteForm from './src/features/activities/QuoteForm';
import PuzzleForm from './src/features/activities/PuzzleForm';
import HappeningForm from './src/features/activities/HappeningForm';
import ChallengeForm from './src/features/activities/ChallengeForm';
import { Icon } from '@muratoner/semantic-ui-react-native';
import * as Linking from 'expo-linking';
LogBox.ignoreLogs(['Reanimated 2']);

const prefix = Linking.makeUrl('/');

const linking = {
  prefixes:[prefix],
  config: {
   screens:{
     Arena: "arena"
   }
  }
}

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
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;

  return (
    <Drawer.Navigator screenOptions={{ headerShown: true, headerTitle: "" }} drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            style={{ borderColor: "red" }}
            label="Odjava"
            onPress={logout}
            icon={({ size }) => <Icon name="power" size={size} />}
          />
        </DrawerContentScrollView>
      );
    }}>
      <Drawer.Screen name="Arena" component={ArenaScreen} />
      <Drawer.Screen
        name="Dobro Delo"
        component={GoodDeedForm}
        options={{
          drawerIcon: ({size}) => <Icon name="heartbeat" size={size} type="FontAwesome" />,
        }}
      />
      <Drawer.Screen
        name="Vic"
        component={JokeForm}
        options={{
          drawerIcon: ({size}) => <Icon name="smile-o" size={size} type="FontAwesome" />,
        }}
      />
      <Drawer.Screen
        name="Izreka"
        component={QuoteForm}
        options={{
          drawerIcon: ({size}) => <Icon name="commenting" size={size} type="FontAwesome" />,
        }}
      />
      <Drawer.Screen
        name="Zagonetka"
        component={PuzzleForm}
        options={{
          drawerIcon: ({size}) => <Icon name="puzzle-piece" size={size} type="FontAwesome" />,
        }}
      />
      <Drawer.Screen
        name="Događaj"
        component={HappeningForm}
        options={{
          drawerIcon: ({size}) => <Icon name="address-card-o" size={size} type="FontAwesome" />,
        }}
      />
      <Drawer.Screen
        name="Izazov"
        component={ChallengeForm}
        options={{
          drawerIcon: ({size}) => <Icon name="hand-rock-o" size={size} type="FontAwesome" />,
        }}
      />
    </Drawer.Navigator>
  );
}

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { token, setToken } = rootStore.commonStore;

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
  },[]);

  return !appLoaded ? (
    <View style={styles.container}>
      <Text>Loading</Text>
    </View>
  ) : (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <ModalContainer />
      <Stack.Navigator>
        {token == null ? (
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Stack.Screen
            name="Arena"
            component={ArenaScreen}
            options={{
              headerShown: false,
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default observer(App);
