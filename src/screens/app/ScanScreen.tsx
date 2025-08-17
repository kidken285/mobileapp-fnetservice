import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Linking, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import Footer from '@app/components/footer';
import {
  Camera,
  type CameraPermissionStatus,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import RNPermissions, {
  type NotificationOption,
  PERMISSIONS,
  type Permission,
} from 'react-native-permissions';
import {scanQRApi} from '@app/services/api/homeApi';

export const ScanScreen = () => {
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const camera = React.useRef<Camera>(null);
  const device = useCameraDevice('back');
  const navigation = useNavigation();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const value = codes[0]?.value;
      if (value) {
        console.log('QR Code scanned:', value);
        setIsCameraActive(false);

        createInfoCCCD(value);
      }
    },
  });

  const createInfoCCCD = useCallback(async (data: string) => {
    try {
      console.log('data', data);
      let body = {
        qrCode: data,
      };
      const response = await scanQRApi(body);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    } finally {
      Alert.alert('QR Code scanned:', data);
    }
  }, []);

  const requestCameraPermission = useCallback(async () => {
    const currentStatus = await RNPermissions.check(PERMISSIONS.IOS.CAMERA);
    console.log('currentStatus', currentStatus);
    // const currentStatus = Camera.getCameraPermissionStatus();
    // setCameraPermissionStatus(currentStatus);
    if (currentStatus === 'granted') {
      setHasPermission(true);
      return;
    }

    if (currentStatus === 'denied') {
      setHasPermission(false);
      await Linking.openSettings();
      return;
    }

    const newStatus = await RNPermissions.request(PERMISSIONS.ANDROID.CAMERA);

    console.log('newStatus', newStatus);
    setCameraPermissionStatus(newStatus as CameraPermissionStatus);
    setHasPermission(newStatus === 'granted');
    if (newStatus === 'denied') {
      await Linking.openSettings();
    }
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  useFocusEffect(
    useCallback(() => {
      // Re-check permission when screen gains focus (e.g., after returning from Settings)
      requestCameraPermission();
    }, [requestCameraPermission]),
  );

  // Note: scanning handled via useCodeScanner above

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Footer
          labelButtonNext="Yêu cầu quyền"
          onPressNext={requestCameraPermission}
          onPressBack={() => {
            setIsCameraActive(false);
            navigation.goBack();
          }}
        />
      </View>
    );
  }

  if (device == null) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isCameraActive}
        enableZoomGesture
        photo={true}
        codeScanner={codeScanner}
      />
      <Footer
        labelButtonNext="Quét lại"
        onPressNext={() => setIsCameraActive(true)}
        onPressBack={() => {
          setIsCameraActive(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    marginBottom: 20,
  },
});
