import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Headers from '@app/components/header';
import colors from '@app/theme/colors';
import {MyText} from '@app/components';
import {helper} from '@app/common';
import Footer from '@app/components/footer';
import metrics from '@app/theme/metrics';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import MyIcon from '@app/components/icon/MyIcon';
import {paymentQrApi} from '@app/services/api/paymenyApi';
const TIME_LEFT = 30;
export const PaymentScreen = ({route}: any) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LEFT); // 5 minutes in seconds
  const [qrData, setQrData] = useState(''); // 5 minutes in seconds
  const navigation = useNavigation();
  const timerRef = React.useRef<any>(-1);

  useEffect(() => {
    getQrPayment();
  }, []);

  const getQrPayment = async () => {
    try {
      const price = route.params?.item?.price;
      const response = await paymentQrApi(price);
      console.log('response', response);
    } catch (error) {
    } finally {
      setQrData(
        `https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${route.params?.item?.price}&addInfo=dong%20gop%20quy%20vac%20xin&accountName=Quy%20Vac%20Xin%20Covid`,
      );
    }
  };

  const forceStopTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTimeLeft(0);
    }
  }, []);

  const startTimer = React.useCallback(() => {
    setTimeLeft(TIME_LEFT);
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    timerRef.current = timer;
    getQrPayment();
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const cleanup = startTimer();
    return cleanup;
  }, [startTimer]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MyText fontSize={32} variant="medium" style={styles.headerText}>
          Vui lòng thanh toán
        </MyText>
        <MyText fontSize={52} variant="bold" style={styles.headerText}>
          {helper.formatDisplayPoint(route.params?.item?.price || 0, 'đ')}
        </MyText>
        <MyText fontSize={32} variant="medium" style={styles.headerText}>
          {`Thời gian còn lại: ${timeLeft}`}
        </MyText>
        <View style={styles.wavyBottom} />
      </View>
      <View style={styles.content}>
        {timeLeft > 0 ? (
          <Image
            source={{
              uri: qrData,
            }}
            style={{width: 375, height: 375}}
            resizeMode="contain"
          />
        ) : (
          <TouchableWithoutFeedback onPress={startTimer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                height: 200,
              }}>
              <MyIcon family="Ionicons" name="refresh-outline" size={24} />
              <MyText>Tạo mã mới</MyText>
            </View>
          </TouchableWithoutFeedback>
        )}

        <MyText fontSize={24} variant="medium">
          Vui lòng quét mã QR để thanh toán
        </MyText>

        <TouchableOpacity
          onPress={() => {
            forceStopTimer();
            navigation.goBack();
          }}
          style={{
            borderRadius: 24,
            borderColor: colors.separate,
            borderWidth: 1,
            padding: 10,
            paddingHorizontal: 40,
          }}>
          <MyText variant="medium" style={{color: colors.text.primary}}>
            Đóng
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: colors.primary.main,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    gap: 10,
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
});
