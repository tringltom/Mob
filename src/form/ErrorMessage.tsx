import { SafeAreaView, ScrollView, Text, View } from "react-native";

import { EkvitiColors } from "../layout/EkvitiColors";
import MarkedList from '@jsamr/react-native-li';
import React from "react";
import Spacer from "./Spacer";
import disc from '@jsamr/counter-style/presets/disc';

interface IProps {
  errors: any;
}

export const ErrorMessage: React.FC<IProps> = ({ errors }) => {
  if (typeof errors === "string")
    errors = JSON.parse(errors);
  
  return (
    <ScrollView style={{maxHeight:"30%", borderColor: EkvitiColors.error, backgroundColor: "snow", borderRadius: 5, borderStyle: "solid", borderWidth: 1}}>
      <Text style={{ color: EkvitiColors.error, textAlign:"center" }}>
        Nažalost, došlo je do problema :/
      </Text>
      {errors && errors.errors && Object.keys(errors?.errors).length > 0 && (
      <MarkedList counterRenderer={disc}>
        {Object.values(errors?.errors)
          .flat()
          .map((err: any, i: React.Key | null | undefined) => (
            <Text key={i} style={{ flexShrink: 1, color: EkvitiColors.error }}>
              {err}
            </Text>
          ))}
      </MarkedList>
      )}
    </ScrollView>
  );
};
