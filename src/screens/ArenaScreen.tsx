import { Animated, Easing, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

//import Container from "toastify-react-native";




const ArenaScreen = () => {

  const {rotateAnimation, showDice, getPrice} = useContext(RootStoreContext);

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <>
      {showDice && (
        <TouchableOpacity
          style={{ position: "absolute", left: 0, top: 0 }}
          onPress={getPrice}
        >
          <Animated.Image
            style={[{ width: 70, height: 70 }, animatedStyle]}
            source={require("../../assets/d20.png")}
          ></Animated.Image>
        </TouchableOpacity>
      )}
      {/* <Container position="bottom" height={45} width={300} duration={3000} /> */}
    </>
  );
};

export default observer(ArenaScreen);