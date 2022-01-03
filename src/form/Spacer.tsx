import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spacer : React.FC<React.ReactNode> = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    marginBottom: 10,
    marginTop: 10
  }
});

export default Spacer;
