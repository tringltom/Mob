import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Container from "toastify-react-native";

const styles = StyleSheet.create({});

const ArenaScreen = () => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>Arena Screen</Text>
      <Container position="bottom" height={45} width={300} duration={3000} />
    </>
  );
};

export default ArenaScreen;