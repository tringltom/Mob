import * as ImagePicker from 'expo-image-picker';

import { Button, Center } from '@muratoner/semantic-ui-react-native';
import { Image, View } from 'react-native';
import React, { ChangeEvent, useState } from 'react';

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
        globalThis.toast.show("Odbili ste pristup vašim slikama..", {type: "danger"});
        }, 0);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagesUri([result.uri]);
      onChange(result.uri);
    }
  };

  const takeImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      setTimeout(() => {
        globalThis.toast.show("Odbili ste pristup kameri..", {type: "danger"});
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