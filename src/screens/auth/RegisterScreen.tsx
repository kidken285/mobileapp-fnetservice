import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, HelperText, useTheme} from 'react-native-paper';
import {MyText} from '@components';
import {useAuth} from '../../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import Header from '@app/components/header';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {MyInput} from '@app/components/input/MyInput';
import MyIcon from '@app/components/icon/MyIcon';
import colors from '@app/theme/colors';
import metrics from '@app/theme/metrics';
import Footer from '@app/components/footer';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type FormUserValues = {
  fullName: string;
  gender: string;
  username: string;
  phone: string;
  otp: string;
};
export const RegisterScreen = () => {
  const navigation = useNavigation<Props>();
  const {signUp} = useAuth();

  const {...methods} = useForm<FormUserValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      gender: '',
      username: '',
      phone: '',
      otp: '',
    },
  });

  const [formError, setError] = useState<Boolean>(false);

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    username: '',
    phone: '',
    otp: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    gender: '',
    username: '',
    phone: '',
    otp: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {...errors};

    if (!formData.fullName) {
      newErrors.fullName = 'Họ tên không được để trống';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = 'Tài khoản không được để trống';
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Số điện thoại không được để trống';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!formData.otp) {
      newErrors.otp = 'Mã OTP không được để trống';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      // In a real app, you would make an API call here
      signUp('dummy-token');
    }
  };

  const onError: SubmitErrorHandler<FormUserValues> = (errors, e) => {
    return console.log({errors});
  };

  const onSubmit: SubmitHandler<FormUserValues> = async data => {
    console.log('data', data);
  };

  return (
    <View style={styles.container}>
      <Header title="Đăng ký tài khoản hội viên" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {formError ? (
          <View>
            <MyText style={{color: 'red'}}>
              There was a problem with loading the form. Please try again later.
            </MyText>
          </View>
        ) : (
          <View style={{padding: 16}}>
            <FormProvider {...methods}>
              <MyInput
                name="fullName"
                label="Họ tên"
                placeholder="Nhập họ tên"
                keyboardType="default"
                rules={{
                  required: 'Họ tên là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
              <MyInput
                name="gender"
                label="Giới tính"
                placeholder="Nhập giới tính"
                keyboardType="default"
                rules={{
                  required: 'Giới tính là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
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
                name="phone"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                rules={{
                  required: 'Số điện thoại là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
              <MyInput
                name="otp"
                label="Mã OTP"
                placeholder="Nhập mã OTP"
                keyboardType="number-pad"
                rules={{
                  required: 'Mã OTP là bắt buộc!',
                }}
                setFormError={setError}
                editable={true}
              />
            </FormProvider>
          </View>
        )}
      </ScrollView>
      <Footer
        labelButtonNext="Bước kế tiếp"
        onPressNext={methods.handleSubmit(onSubmit, onError)}
        onPressBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
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
  },
  backButton: {
    marginTop: 8,
  },
});
