import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { View } from 'react-native';
import ActivityList from '../features/activities/ActivityList';
import { ActivityListItemPlaceholder } from '../features/activities/ActivityListItemPlaceholder';
import { RootStoreContext } from '../stores/rootStore';
import ToastManager from 'toastify-react-native';

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
        <ToastManager position="bottom" height={45} width={300} duration={3000}/>
      </View>
    );
}

export default observer(ApprovalScreen);