import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({});

const WelcomeScreen = ({navigation}) => {
    return (
      <>
        <Text style={{ fontSize: 48 }}>Welcome screen</Text>
        <Button
          title="Sign in"
          onPress={() => {}}
        />
      </>
    );
};

export default WelcomeScreen;