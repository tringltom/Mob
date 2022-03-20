import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import ArenaScreen from './src/screens/ArenaScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { DefaultTheme, DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStoreContext } from './src/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ModalContainer from './src/modals/ModalContainer';
import { navigate, navigationRef } from './src/navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoodDeedForm from './src/features/activities/GoodDeedForm';
import JokeForm from './src/features/activities/JokeForm';
import QuoteForm from './src/features/activities/QuoteForm';
import PuzzleForm from './src/features/activities/PuzzleForm';
import HappeningForm from './src/features/activities/HappeningForm';
import ChallengeForm from './src/features/activities/ChallengeForm';
import { Avatar, Button, Icon } from '@muratoner/semantic-ui-react-native';
import { useNavigation } from '@react-navigation/native';
import ApprovalScreen from './src/screens/ApprovalScreen';
import { ProfileContent } from './src/features/profile/ProfileContent';
import * as Linking from 'expo-linking';
LogBox.ignoreLogs(['Reanimated 2']);

const prefix = Linking.makeUrl('/');

const linking = {
  prefixes:[prefix],
  config: {
   screens:{
     VerifyEmail: "verifyEmail"
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

const mainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'white'
  },
};

const Stack = createStackNavigator();
const ActivityDrawer = createDrawerNavigator();
const SettingsDrawer = createDrawerNavigator();

const RightDrawerNav = () => {
  const navigation = useNavigation();

  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  

  return (
    <ActivityDrawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        drawerPosition: "left",
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <Avatar containerStyle={{marginRight: 5, marginTop: 5}} source={require('./assets/user.png')} />
            <Button style={{marginRight: 4}} title={user?.username} color="secondary" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
          </View>
        ),
      }}
    >
      <ActivityDrawer.Screen name="Arena" component={ArenaScreen} />
      <ActivityDrawer.Screen
        name="Dobro Delo"
        component={GoodDeedForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="heartbeat" size={size} type="FontAwesome" />
          ),
        }}
      />
      <ActivityDrawer.Screen
        name="Vic"
        component={JokeForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="smile-o" size={size} type="FontAwesome" />
          ),
        }}
      />
      <ActivityDrawer.Screen
        name="Izreka"
        component={QuoteForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="commenting" size={size} type="FontAwesome" />
          ),
        }}
      />
      <ActivityDrawer.Screen
        name="Zagonetka"
        component={PuzzleForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="puzzle-piece" size={size} type="FontAwesome" />
          ),
        }}
      />
      <ActivityDrawer.Screen
        name="Događaj"
        component={HappeningForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="address-card-o" size={size} type="FontAwesome" />
          ),
        }}
      />
      <ActivityDrawer.Screen
        name="Izazov"
        component={ChallengeForm}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="hand-rock-o" size={size} type="FontAwesome" />
          ),
        }}
      />
    </ActivityDrawer.Navigator>
  );
};
const MainScreen = () => {
  const rootStore = useContext(RootStoreContext);
  const { logout } = rootStore.userStore;
  const navigation = useNavigation();


  return (
    <SettingsDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right"
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Odjava"
              onPress={logout}
              icon={({ size }) => <Icon name="power" size={size} />}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <SettingsDrawer.Screen
        name=" Arena"
        component={RightDrawerNav}
      />
      <SettingsDrawer.Screen
        name="Odobrenja"
        component={ApprovalScreen}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="check" size={size} type="FontAwesome" />
          ),
          headerTitle: 'Odobrenja',
          headerShown: true,
          headerLeft:() => (
            <Button onPress={() => navigate('Arena')} style={{marginLeft: 5}} iconName="chevron-left" iconType="FontAwesome"/>
          )
        }}
      />
       <SettingsDrawer.Screen
        name="Profil"
        component={ProfileContent}
        options={{
          unmountOnBlur: true,
          drawerIcon: ({ size }) => (
            <Icon name="users" size={size} type="FontAwesome" />
          ),
          headerTitle: 'Profil',
          headerShown: true,
          headerLeft:() => (
            <Button onPress={() => navigate('Arena')} style={{marginLeft: 5}} iconName="chevron-left" iconType="FontAwesome"/>
          )
        }}
      />
    </SettingsDrawer.Navigator>
  );
}


const App = () => {
  LogBox.ignoreLogs(["Failed prop type:"]);
  const rootStore = useContext(RootStoreContext);
  const { token, setToken } = rootStore.commonStore;
  const { getUser } = rootStore.userStore

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    async function getToken() {
      await AsyncStorage.getItem("jwt").then((res) => {
        setToken(res);
        getUser().finally(() => setAppLoaded(true));
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
    <NavigationContainer ref={navigationRef} linking={linking} theme={mainTheme}>
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
        {
        // Uncomment when verifyEmail is created to test for deepLink
        /* <Stack.Screen
            name="verifyEmail"
            component={VerifyEmail}
            options={{
              headerShown: false,
            }}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default observer(App);
