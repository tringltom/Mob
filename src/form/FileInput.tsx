import React, { ChangeEvent, useState } from 'react';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Center } from '@muratoner/semantic-ui-react-native';
import { Toast } from "toastify-react-native";

interface IProps {
    onChange: (e: string | ChangeEvent<any>) => void;
  };

const FileInput: React.FC<IProps> = ( {onChange} ) => {
  const [imagesUri, setImagesUri] = useState<string[]>([]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      setTimeout(() => {
        Toast.error("Odbili ste pristup vašim slikama..");
        }, 0);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(onChange);

    if (!result.cancelled) {
      setImagesUri([result.uri]);
      onChange(result.uri);
    }
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      setTimeout(() => {
        Toast.error("Odbili ste pristup kameri..");
        }, 0);
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImagesUri([result.uri]);
      onChange(result.uri);
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 1,
          marginBottom: 10,
        }}
      >
        <Button
          style={{flex:1, marginRight:2}}
          color="primary"
          title={"sa telefona"}
          iconName="upload"
          iconType="FontAwesome"
          onPress={() => pickImage()}
        />
        <Button
          style={{flex:1, marginLeft: 2}}
          color="secondary"
          title={"sa kamere"}
          iconName="camera"
          iconType="FontAwesome"
          onPress={() => takeImage()}
        />
      </View>
      {imagesUri?.map((image) => (
        <Center>
          <Image
            key={1}
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
            />
        </Center>
      ))}
    </>
  );
};

export default FileInput;