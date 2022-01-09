import { Avatar } from '@muratoner/semantic-ui-react-native';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootStoreContext } from '../../stores/rootStore';

const styles = StyleSheet.create({});

export const ProfileAbout = () => {

    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;

    return (
      <>
        <View style={{ flexDirection: "row" }}>
          <Avatar
            containerStyle={{ marginRight: 5, marginTop: 5 }}
            source={require("../../../assets/user.png")}
            size={100}
          />
          <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>
            {user?.username}
          </Text>
          <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>
            Nivo: {user?.currentLevel}
          </Text>
          <Text style={{ textAlignVertical: "center", marginLeft: 10 }}>
            IP: {user?.currentXp}
          </Text>
        </View>
        <View>
          <Text>About</Text>
        </View>
      </>
    );
};
