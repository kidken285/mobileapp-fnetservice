import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  useTheme,
} from 'react-native-paper';
import {useAuth} from '../../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';

import metrics from '@app/theme/metrics';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export const SplashScreen = () => {
  const navigation = useNavigation<Props>();
  const color = useTheme;
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://fus.gitbook.io/fnet/~gitbook/image?url=https%3A%2F%2F3941533041-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FF2jfIyarv9tD05sn0Dcz%252Fuploads%252FHdklHOYzIWqS3Rq9oWyC%252FFNet.jpg%3Falt%3Dmedia%26token%3D1f87a27e-1f04-41a1-9948-1a9d3595a694&width=1248&dpr=4&quality=100&sign=f9b11825&sv=2',
        }}
        style={{
          width: metrics.screenWidth,
          height: metrics.screenHeight / 2,
        }}
      />

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 32,
        }}>
        <Button
          mode="outlined"
          textColor={'#000'}
          onPress={() => navigation.navigate('Register')}
          style={[
            styles.button,
            {
              borderColor: '#D3D3D3',
              borderWidth: 1,
            },
          ]}
          labelStyle={{fontWeight: 'bold', fontSize: 16}}>
          Đăng ký tài khoản
        </Button>
        <Button
          mode="outlined"
          textColor="#000"
          style={[
            styles.button,
            {
              borderColor: '#D3D3D3',
              borderWidth: 1,
            },
          ]}
          labelStyle={{fontWeight: 'bold', fontSize: 16}}
          onPress={() => navigation.navigate('Login')}>
          Đăng nhập
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    width: metrics.screenWidth / 3
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerButton: {
    marginLeft: -8,
  },
});
