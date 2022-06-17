import React, { useContext, useEffect } from 'react'

import ActivityList from '../activities/ActivityList';
import { ActivityListItemPlaceholder } from '../activities/ActivityListItemPlaceholder';
import { RootStoreContext } from '../../app/stores/rootStore';
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
