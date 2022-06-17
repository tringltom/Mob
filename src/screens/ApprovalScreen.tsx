import React, { useContext, useEffect } from 'react'

import ActivityList from '../features/activities/ActivityList';
import { ActivityListItemPlaceholder } from '../features/activities/ActivityListItemPlaceholder';
import { RootStoreContext } from '../stores/rootStore';
import { View } from 'react-native';
import { observer } from 'mobx-react-lite';

const ApprovalScreen: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const {loadPendingActivities, loadingInitial, page} = rootStore.activityStore;
   
    useEffect(() => {
      loadPendingActivities();
    }, [loadPendingActivities]);

    return (
      <View>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : (
          <ActivityList />
        )}
      </View>
    );
}

export default observer(ApprovalScreen);
