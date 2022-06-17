import { ActivityIndicator, View } from 'react-native';
import React, { useContext, useState } from 'react'

import { ActivityListItem } from './ActivityListItem';
import { FlatList } from 'react-native-gesture-handler';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {activitiesArray, } = rootStore.activityStore;

  const {loadPendingActivities, loadingInitial, setPage, page, totalPages} = rootStore.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);
  
  const handleGetNext = () => {
    if (!loadingNext && page + 1 < totalPages) {
      setLoadingNext(true);
      setPage(page + 1);
      loadPendingActivities().then(() => setLoadingNext(false));
    }
  }
    return (
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10
        }}
        style={{paddingBottom:100}}
        ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
        onEndReached={handleGetNext}
        onEndReachedThreshold={0.5}
        data={activitiesArray}
        keyExtractor={(activity) => activity.id.toString()}
        renderItem={({ item }) => (
          // @ts-ignore: Typescript/react-native-blob issue - working as expected witohut typescript  
          <ActivityListItem key={item.id} activity={item}/>
        )}
        ListFooterComponent={<ActivityIndicator size="large" color="blue" animating={loadingNext} />}
        ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
      />
    );
}

export default observer(ActivityList);