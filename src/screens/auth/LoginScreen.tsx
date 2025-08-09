import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen = () => {
  const navigation = useNavigation<Props>();
  const { signIn } = useAuth();

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
    const newErrors = { ...errors };

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
      <Text style={styles.labelText}>{label}</Text>
      <Text style={styles.requiredStar}>*</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="headlineMedium" style={styles.headerText}>
            Đăng nhập hệ thống
          </Text>
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
            onChangeText={(text) => setFormData({ ...formData, username: text })}
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
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry={!showPassword}
            error={!!errors.password}
            // right={
            //   <TextInput.Icon
            //     icon={showPassword ? 'eye-off' : 'eye'}
            //     onPress={() => setShowPassword(!showPassword)}
            //   />
            // }
            style={styles.input}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.noAccountText}>Chưa có tài khoản </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              textColor="#0088CC"
              style={styles.registerButton}
              
              labelStyle={styles.registerButtonLabel}
            >
              Đăng ký ngay
            </Button>
          </View>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            buttonColor="#0088CC"
            contentStyle={styles.loginButtonContent}
            labelStyle={styles.loginButtonLabel}
          >
            Đăng nhập
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#0088CC',
    height: 20, // 20% of screen height
    position: 'relative',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 3, // Responsive font size
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
    padding: 4, // 4% of screen width
    paddingTop: 3,
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  labelText: {
    fontSize: 2.2,
    color: '#000',
  },
  requiredStar: {
    color: 'red',
    marginLeft: 4,
    fontSize: 2.2,
  },
  input: {
    backgroundColor: '#fff',
  },
  inputContent: {
    height: 7, // Tăng chiều cao input
    fontSize: 2,
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
  footerLeft: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#000',
    fontSize: 20,
  },
  registerButton: {
    marginLeft: -8,
  },
  registerButtonLabel: {
    fontSize: 20,
    lineHeight: 25
  },
  loginButton: {
    borderRadius: 8,
    paddingHorizontal: 4,
    height: 7, // Tăng chiều cao button
  },
  loginButtonContent: {
    height: 7,
  },
  loginButtonLabel: {
    fontSize: 2.2,
    fontWeight: 'bold',
  },
});