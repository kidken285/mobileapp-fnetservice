import {TOKEN_NOTIFICATION} from '@constants';
import {firebase} from '@react-native-firebase/messaging';
import {storage} from '@storage';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export const getTokenNotification = async () => {
  try {
    console.log('getTokenNotification');
    const {status} = await checkNotifications();
    let statusAuthorizationStatus = status;
    console.log('getTokenNotification', status);
    if (status === 'denied') {
      const {status} = await requestNotifications(['alert', 'sound']);
      statusAuthorizationStatus = status;
    }

    if (statusAuthorizationStatus === 'granted') {
      let tokenNotification = storage.getString(TOKEN_NOTIFICATION);
      console.log('FCM-storage', tokenNotification);
      if (tokenNotification === null || tokenNotification === undefined) {
        if (!firebase.messaging().isDeviceRegisteredForRemoteMessages) {
          await firebase.messaging().registerDeviceForRemoteMessages();
        }
        tokenNotification = await firebase.messaging().getToken();
        console.log('FCM', tokenNotification);
        if (tokenNotification) {
          storage.set('TOKEN_NOTIFICATION', tokenNotification);
        }
      }
      return tokenNotification;
    }
    return null;
  } catch (error) {
    console.log('FCM-error', error);
    return null;
  }
};
