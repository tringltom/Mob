import { ActivityTypes, IActivity, IPhoto } from '../../app/models/activity';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';

import { Button } from '@muratoner/semantic-ui-react-native';
import {Card} from 'react-native-elements';
import ModalYesNo from '../../app/common/modals/ModalYesNo';
import { RootStoreContext } from '../../app/stores/rootStore';

export const ActivityListItem = React.memo<IActivity>(function ActivityListItem(
  {activity}
) {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  const { approvePendingActivity } = rootStore.activityStore;

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Card containerStyle={{ minWidth: "90%" }}>
        <Card.Title>{activity.title}</Card.Title>
        <Card.Divider />
        <Text>Stvaralac: {activity.userName}</Text>
        {activity.photos?.map((photo: IPhoto) => (
          <Card.Image
            key={photo.id}
            style={{ width: "100%", aspectRatio: 1, resizeMode: "contain" }}
            source={{
              uri: photo.url,
            }}
          />
        ))}

        <Text>{activity.description}</Text>
        {activity.type === ActivityTypes.Puzzle && <Text>Odgovor: {activity.answer}</Text>}
        <Text>Lokacija: {activity.location}</Text>
        <Text>Dužina: {activity.longitude}</Text>
        <Text>Širina: {activity.latitude}</Text>
        <Text>Početak: {activity.startDate}</Text>
        <Text>Kraj: {activity.endDate}</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            style={{ flex: 1 }}
            title="Zabrani"
            color="red"
            loading={!rootStore.allowEvents}
            disabled={!rootStore.allowEvents}
            onPress={() =>
              openModal(
                <ModalYesNo
                  handleConfirmation={async () =>
                    await approvePendingActivity(activity.id, false)
                  }
                  content="Odbiti aktivnost"
                  icon="thumbs-down"
                />
              )
            }
          />
          <Button
            style={{ flex: 1 }}
            // @ts-ignore: libary issue - working as expected 
            color="green"
            title="Dozvoli"
            onPress={() =>
              openModal(
                <ModalYesNo
                  handleConfirmation={async () =>
                    await approvePendingActivity(activity.id, true)
                  }
                  content="Dozvoliti aktivnost"
                  icon="thumbs-up"
                />
              )
            }
          />
        </View>
      </Card>
    </View>
  );
});

