import { Card } from 'react-native-elements';
import { Instagram } from 'react-content-loader/native'
import React from 'react'
import { View } from 'react-native';

export const ActivityListItemPlaceholder = () => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {[...Array(2)].map((el, i) => (
        <Card key={i} containerStyle={{ minWidth: "75%" }}>
          <Instagram />
        </Card>
      ))}
    </View>
  );
};
