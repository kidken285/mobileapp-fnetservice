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

type Props = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  const {signIn} = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {...errors};

    if (!formData.username) {
      newErrors.username = 'Tài khoản không được để trống';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // In a real app, you would make an API call here
      signIn('dummy-token');
    }
  };

  const renderRequiredLabel = (label: string) => (
    <View style={styles.labelContainer}>
      <MyText style={styles.requiredStar}>*</MyText>
      <MyText style={styles.labelText}>{label}</MyText>
    </View>
  );

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
          <View style={styles.formContainer}>
            {renderRequiredLabel('Tài khoản')}
            <TextInput
              mode="outlined"
              placeholder="Nhập tài khoản"
              value={formData.username}
              onChangeText={text => setFormData({...formData, username: text})}
              error={!!errors.username}
              style={styles.input}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
            />
            <HelperText type="error" visible={!!errors.username}>
              {errors.username}
            </HelperText>

            {renderRequiredLabel('Mật khẩu')}
            <TextInput
              mode="outlined"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              secureTextEntry={!showPassword}
              error={!!errors.password}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              style={styles.input}
              outlineStyle={styles.inputOutline}
              contentStyle={styles.inputContent}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>
          </View>

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
              onPress={() => navigation.navigate('Login')}>
              Đăng nhập
            </Button>
            {/* <Button
              mode="outlined"
              onPress={handleLogin}
              style={styles.loginButton}
              buttonColor="#0088CC"
              contentStyle={styles.loginButtonContent}
              labelStyle={styles.loginButtonLabel}>
              Đăng nhập
            </Button> */}
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
