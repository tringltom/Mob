import { Icon, LabeledButton, Title } from '@muratoner/semantic-ui-react-native';
import React, { forwardRef } from 'react';
import { TextInput as RNTextInput, View, StyleSheet, TextInputProps, Text } from 'react-native';
import Spacer from './Spacer';

interface IProps extends TextInputProps{
  icon? : string,
  error? : string,
  touched? : boolean,
  ref? : any
}

const TextInput : React.FC<IProps> = forwardRef(({ icon, error, touched, ...otherProps }, ref ) => {
    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';
    return (
      <Spacer>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              height: 48,
              borderRadius: 5,
              borderColor: validationColor,
              borderWidth: StyleSheet.hairlineWidth,
              padding: 8,
            },
            touched && error ? {backgroundColor : "rgb(255,246,246)"} : {}
          ]}
        >
          <View style={{ padding: 8 }}>
            <Icon name={icon} color={validationColor} size={16} />
          </View>
          <View style={{ flex: 1 }}>
            <RNTextInput
              underlineColorAndroid="transparent"
              placeholderTextColor={
                touched && error ? "rgb(231,201,218)" : "rgba(34, 62, 75, 0.7)"
              }
              ref={ref}
              {...otherProps}
            />
          </View>
        </View>
        {touched && error && (
          <View
            style={{
              borderRadius: 5,
              borderColor: "red",
              borderWidth: 1,
              paddingLeft: 8,
              paddingRight: 8,
              alignSelf: "flex-start",
            }}
          >
            <Text style={{ color: "rgb(230,106,71)" }}>{error}</Text>
          </View>
        )}
      </Spacer>
    );
  });

  export default TextInput;