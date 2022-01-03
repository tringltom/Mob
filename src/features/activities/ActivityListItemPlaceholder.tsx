import React from 'react'
import { View } from 'react-native';
import { Instagram } from 'react-content-loader/native'
import { Card } from 'react-native-elements';

export const ActivityListItemPlaceholder = () => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {[...Array(2)].map((el, i) => (
        <Card key={i} containerStyle={{ minWidth: "75%" }}>
          <Instagram width={300} height={350} />
        </Card>
      ))}
    </View>
  );
};
