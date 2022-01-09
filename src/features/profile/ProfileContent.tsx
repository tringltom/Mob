import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ProfileAbout} from './ProfileAbout';
import {ProfileSkills} from './ProfileSkills';
import { Icon } from '@muratoner/semantic-ui-react-native';
import {ProfilePendingActivities} from './ProfilePendingActivities';
import {ProfileActivities} from './ProfileActivities';
import {ProfileFavourites} from './ProfileFavourites';

const Tab = createBottomTabNavigator();

export const ProfileContent:React.FC = () => {
  return (
      <Tab.Navigator
      >
        <Tab.Screen
          name="Detalji"
          component={ProfileAbout}
          options={{
            tabBarIcon: () => <Icon name="info" type="FontAwesome" size={20} />,
            headerShown: false}}
        />
        <Tab.Screen
          name="Veštine"
          component={ProfileSkills}
          options={{
            tabBarIcon: () => <Icon name="running" type="FontAwesome5" size={20} />,
            headerShown: false}}
        />
        <Tab.Screen
          name="Na čekanju"
          component={ProfilePendingActivities}
          options={{
            tabBarIcon: () => <Icon name="spinner" type="FontAwesome5" size={20} />,
            headerShown: false}}
        />
        <Tab.Screen
          name="Odobreno"
          component={ProfileActivities}
          options={{
            tabBarIcon: () => <Icon name="thumbs-up" type="FontAwesome5" size={20} />,
            headerShown: false}}
        />
        <Tab.Screen
          name="Omiljeno"
          component={ProfileFavourites}
          options={{
            tabBarIcon: () => <Icon name="star" type="FontAwesome5" size={20} />,
            headerShown: false}}
        />
      </Tab.Navigator>
  )
}