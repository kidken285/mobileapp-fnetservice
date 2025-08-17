import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {MyText} from '@components';
import {useAuth} from '../../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import metrics from '@app/theme/metrics';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {useApp} from '@app/AppProvider';
import {device, helper} from '@app/common';
import {MyInput} from '@app/components/input/MyInput';
import {useUserStore} from '@app/store/userStore';
import {loginApi} from '@app/services/api/authenApi';
import {SERCET_TOKEN} from '@app/constants/api';
import {TOKEN_NOTIFICATION} from '@app/constants/enumStorage';
import {storage} from '@app/storage';
import {getTokenNotification} from '@app/common/notification';
import {stringMd5} from 'react-native-quick-md5';
import {HOTFIX_TIME} from '@app/api';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type FormUserValues = {
  username: string;
  code: string;
};

export const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  const {signIn} = useAuth();
  const {showLoader, hideLoader, showFlashMessage} = useApp();
  const loadUserProfile = useUserStore(s => s.loadUserProfile);
  const setUser = useUserStore(s => s.setUser);
  const {...methods} = useForm<FormUserValues>({
    mode: 'onChange',
    defaultValues: __DEV__
      ? {
          username: 'ken',
          code: '123456',
        }
      : {
          username: '',
          code: '',
        },
  });

  const [formError, setError] = useState<Boolean>(false);

  const onError: SubmitErrorHandler<FormUserValues> = (errors, e) => {
    return console.log({errors});
  };

  const onSubmit: SubmitHandler<FormUserValues> = async data => {
    try {
      showLoader('Đang tải...');
      const encry_code = stringMd5(data.code.trim());
      const fcm =
        storage.getString(TOKEN_NOTIFICATION) ||
        (await getTokenNotification()) ||
        '';
      let bodyAPI = {
        userName: data.username,
        passCode: encry_code,
        token: SERCET_TOKEN,
        ver: device.getVersion(),
        platform: Platform.OS,
        fcm: fcm,
        deviceId: await device.getDeviceId(),
        deviceName: await device.getDeviceName(),
        modelName: device.getModelDevice(),
        hotfix: HOTFIX_TIME,
      };
      const response = await loginApi(bodyAPI);
      console.log('response', response);

      // signIn('123456');
      // await loadUserProfile();
      // hideLoader();
      // navigation.navigate('Home');
    } catch (error) {
      hideLoader();
    } finally {
      const tmp = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        tokenType: 'Bearer',
        expiresIn: 3600,
        refreshToken: 'some_long_refresh_token_string',
        user: {
          userName: 'Tuan',
          fullName: 'NVT',
        },
      };
      signIn(tmp.accessToken);
      setUser({
        id: 'u-1',
        username: tmp.user.userName,
        fullName: tmp.user.fullName,
        phone: '0123456789',
        gender: 'male',
        roles: ['admin'],
      });

      hideLoader();
      showFlashMessage('top', {
        message: 'Thành công',
        description: 'Đăng nhập thành công',
        type: 'success',
      });
    }

    console.log('data', data);
  };

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      contentInsetAdjustmentBehavior={'automatic'}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MyText fontSize={32} variant="bold" style={styles.headerText}>
              Đăng nhập hệ thống
            </MyText>
          </View>
          <View style={styles.wavyBottom} />
        </View>

        <View style={styles.content}>
          {formError ? (
            <View>
              <MyText style={{color: 'red'}}>
                There was a problem with loading the form. Please try again
                later.
              </MyText>
            </View>
          ) : (
            <FormProvider {...methods}>
              <MyInput
                name="username"
                label="Tài khoản"
                placeholder="Nhập tài khoản"
                keyboardType="default"
                rules={{
                  required: 'Tài khoản là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
              <MyInput
                name="code"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                keyboardType="default"
                rules={{
                  required: 'Mật khẩu là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
            </FormProvider>
          )}
          <View style={styles.footer}>
            <View>
              <MyText variant="medium" fontSize={18} color="#000">
                Chưa có tài khoản
              </MyText>
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Register')}>
                <MyText variant="medium" fontSize={25} color="#0088CC">
                  Đăng ký ngay
                </MyText>
              </TouchableWithoutFeedback>
            </View>
            <Button
              mode="outlined"
              textColor="#000"
              style={[
                {
                  borderColor: '#D3D3D3',
                  borderWidth: 1,
                  marginTop: 16,
                  paddingVertical: 8,
                  width: metrics.screenWidth / 6,
                },
              ]}
              labelStyle={{fontWeight: 'bold', fontSize: 16}}
              onPress={methods.handleSubmit(onSubmit, onError)}>
              Đăng nhập
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0088CC',
    height: metrics.screenHeight * 0.2, // 20% of screen height
    position: 'relative',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
  },
  wavyBottom: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  labelContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    color: '#000',
  },
  requiredStar: {
    color: 'red',
    marginLeft: 4,
    fontSize: 18,
  },
  input: {
    backgroundColor: '#fff',
  },
  inputContent: {
    height: 7, // Tăng chiều cao input
    fontSize: 18,
  },
  inputOutline: {
    borderRadius: 8,
    borderColor: '#E0E0E0',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});
