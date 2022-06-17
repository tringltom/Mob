import 'react-native-gesture-handler';

import * as Expo from 'expo'
import * as Linking from 'expo-linking';

import { Avatar, Button, Icon } from '@muratoner/semantic-ui-react-native';
import { DefaultTheme, DrawerActions, NavigationContainer } from '@react-navigation/native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { navigate, navigationRef } from '../../navigationRef';

import ApprovalScreen from '../../features/approvals/ApprovalScreen';
import ArenaScreen from '../../features/arena/ArenaScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChallengeForm from '../../features/activities/ChallengeForm';
import GoodDeedForm from '../../features/activities/GoodDeedForm';
import HappeningForm from '../../features/activities/HappeningForm';
import JokeForm from '../../features/activities/JokeForm';
import ModalContainer from '../common/modals/ModalContainer';
import { ProfileContent } from '../../features/profile/ProfileContent';
import PuzzleForm from '../../features/activities/PuzzleForm';
import QuoteForm from '../../features/activities/QuoteForm';
import RegisterSuccess from '../../features/user/RegisterSuccess';
import { RootStoreContext } from '../stores/rootStore';
import Toast from "react-native-toast-notifications";
import VerifyEmail from '../../features/user/VerifyEmail';
import WelcomeScreen from '../../features/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';

LogBox.ignoreLogs(['Reanimated 2']);

const prefix = Linking.makeUrl('/');

const linking = {
  prefixes:[prefix],
  config: {
   screens:{
     VerifyEmail: "/users/verifyEmail"
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
            <Avatar containerStyle={{marginRight: 5, marginTop: 5}} source={require('../../../assets/user.png')} />
            <Button style={{marginRight: 4}} title={user?.userName} color="secondary" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}/>
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

  const [data, setData] = useState<Linking.ParsedURL>();
  const [appLoaded, setAppLoaded] = useState(false);

  const handleDeepLink = (event: any) => {
    let data = Linking.parse(event.url);
    setData(data);
  }

  useEffect(() => {
    async function getToken() {
      await AsyncStorage.getItem("jwt").then((res) => {
        setToken(res);
        getUser().finally(() => setAppLoaded(true));
      });
    };

    async function getInitialUrl() {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) 
        setData(Linking.parse(initialUrl));
    };

    setAppLoaded(false);
    getToken();

    Linking.addEventListener("url", handleDeepLink);
    if (!data)
      getInitialUrl();
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
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
        <Stack.Screen
            name="RegisterSuccess"
            component={RegisterSuccess}
            options={{
              headerShown: false,
            }}
          />
        <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={{
              headerShown: false,
            }}
          />
      </Stack.Navigator>
      <Toast ref={(ref: any) => global['toast'] = ref} />
    </NavigationContainer>
  );
}

export default Expo.registerRootComponent(observer(App));
