import { Button, Divider, Icon, Title } from '@muratoner/semantic-ui-react-native'
import React, { useContext } from 'react'

import { RootStoreContext } from '../../stores/rootStore';
import { Text } from 'react-native';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';

interface IProps {
  content : string,
  icon: string,
  handleConfirmation: any;
}

const ModalYesNo : React.FC<IProps> = ({handleConfirmation, content, icon}) => {
    const rootStore = useContext(RootStoreContext);
    const { closeModal } = rootStore.modalStore;
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Icon name={icon} type="FontAwesome" />
        <Title>{content}</Title>
      </View>
      <Divider />
      <View style={{ alignItems: "flex-start" }}>
        <Text>Da li je ovo Vaš konačan izbor?</Text>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          justifyContent: "space-evenly",
          marginTop: 1,
          marginBottom: 10,
        }}
      >
        <Button
          style={{ flex: 1 }}
          title="Ne"
          color="red"
          iconType="FontAwesome"
          iconName="remove"
          onPress={closeModal}
        />
        <Button
          style={{ flex: 1 }}
          title="Da"
          // @ts-ignore: libary issue - working as expected 
          color="green"
          iconType="FontAwesome"
          iconName="check"
          loading={!rootStore.allowEvents}
          disabled={!rootStore.allowEvents}
          onPress={handleConfirmation}
        />
      </View>
    </>
  );
}

export default observer(ModalYesNo);