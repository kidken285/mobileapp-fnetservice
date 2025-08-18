import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/AuthContext';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';
import {LoadingScreen} from '../screens/LoadingScreen';
import {RootStackParamList} from './types';
import {apiBase, METHOD} from '@api';
import {storage} from '@app/storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const {isLoading, userToken} = useAuth();

  useEffect(() => {
    //Get config domain herer
    const getConfig = async () => {
      const response = await apiBase(
        'https://fnet.supportonline.me/mapi/client/app/config',
        METHOD.POST,
        {},
        {},
      );
      console.log('response', response);
      /**
       * https://fnet.supportonline.me/mapi/client/app/config
       * /app/config -> domain : 1 fnet.supportonline.me / 2 : fnet-wifi.supportonline.me nhé em
       */
      let _domain = 'https://fnet.supportonline.me';
      const data = response?.data ?? null;
      const domain = data?.domain ?? null;
      if (domain === 1) {
        _domain = 'https://fnet.supportonline.me';
      } else if (domain == 2) {
        _domain = 'https://fnet-wifi.supportonline.me:9595';
      }
      storage.set('domain', _domain);
    };
    getConfig();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
