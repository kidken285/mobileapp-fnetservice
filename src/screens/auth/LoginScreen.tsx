import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
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
import {helper} from '@app/common';
import {MyInput} from '@app/components/input/MyInput';
import {useUserStore} from '@app/store/userStore';

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
      signIn('123456');
      await loadUserProfile();
      hideLoader();
      // navigation.navigate('Home');
    } catch (error) {
      hideLoader();
    } finally {
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
