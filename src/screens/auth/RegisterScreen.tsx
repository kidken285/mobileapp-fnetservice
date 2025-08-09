import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen = () => {
  const navigation = useNavigation<Props>();
  const { signUp } = useAuth();
  const theme = useTheme();

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
    const newErrors = { ...errors };

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

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Đăng ký tài khoản hội viên
        </Text>

        <TextInput
          mode="outlined"
          label="Họ tên"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          error={!!errors.fullName}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.fullName}>
          {errors.fullName}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Giới tính"
          value={formData.gender}
          onChangeText={(text) => setFormData({ ...formData, gender: text })}
          error={!!errors.gender}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.gender}>
          {errors.gender}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Tài khoản"
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          error={!!errors.username}
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.username}>
          {errors.username}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Số điện thoại"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          error={!!errors.phone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.phone}>
          {errors.phone}
        </HelperText>

        <TextInput
          mode="outlined"
          label="Mã OTP"
          value={formData.otp}
          onChangeText={(text) => setFormData({ ...formData, otp: text })}
          error={!!errors.otp}
          keyboardType="number-pad"
          style={styles.input}
        />
        <HelperText type="error" visible={!!errors.otp}>
          {errors.otp}
        </HelperText>

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
        >
          Bước kế tiếp
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Trở lại
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
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
  },
  backButton: {
    marginTop: 8,
  },
});