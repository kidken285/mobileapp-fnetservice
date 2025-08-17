import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import Headers from '@app/components/header';
import colors from '@app/theme/colors';
import {MyText} from '@app/components';
import {helper} from '@app/common';
import Footer from '@app/components/footer';
import {useNavigation} from '@react-navigation/native';
import {useUserStore} from '@app/store/userStore';
import {dashBoardApi} from '@app/services/api/homeApi';

export const HomeScreen = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation<any>();
  const [selectedTab, setSelectedTab] = useState<'single' | 'combo'>('single');
  const userInfo = useUserStore(s => s.user);

  const [data, setData] = useState<any[]>([]);

  const [itemSelected, setItemSelected] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await dashBoardApi();
        console.log('response', response);
      } catch (error) {
        setData([
          {
            id: 1,
            name: 'Combo Khoai tây chiên 1',
            price: 100000,
            image:
              'https://texaschickenvn.com/vnt_upload/product/07_2023/Combo_B_Ga_sot_bo_toi__thao_moc.png',
          },
          {
            id: 2,
            name: 'Combo Khoai tây chiên 2',
            price: 150000,
            image:
              'https://texaschickenvn.com/vnt_upload/product/07_2023/Combo_B_Ga_sot_bo_toi__thao_moc.png',
          },
          {
            id: 3,
            name: 'Combo Khoai tây chiên 3',
            price: 120000,
            image:
              'https://pimagerepository.texaschicken.com/feaeda84-705c-4158-8cf6-e35fd8fc7441_actual.png',
          },
          {
            id: 4,
            name: 'Combo Khoai tây chiên 4',
            price: 140000,
            image:
              'https://pimagerepository.texaschicken.com/feaeda84-705c-4158-8cf6-e35fd8fc7441_actual.png',
          },
        ]);
      }
    };
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <Headers title={`Hội viên: ${userInfo?.fullName}`} />
      <View style={{alignContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            marginTop: 20,
            borderColor: colors.primary.main,
            borderWidth: 1,
            borderRadius: 20,
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
          <TouchableWithoutFeedback onPress={() => setSelectedTab('single')}>
            <View
              style={{
                paddingVertical: 10,
                width: 120,
                backgroundColor:
                  selectedTab === 'single'
                    ? colors.primary.main
                    : 'transparent',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <MyText
                color={selectedTab === 'single' ? '#fff' : colors.text.primary}
                variant="medium">
                Nạp
              </MyText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedTab('combo')}>
            <View
              style={{
                paddingVertical: 10,
                width: 120,
                backgroundColor:
                  selectedTab === 'combo' ? colors.primary.main : 'transparent',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <MyText
                color={selectedTab === 'combo' ? '#fff' : colors.text.primary}
                variant="medium">
                Combo
              </MyText>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 30}}>
        <FlatList
          data={data}
          numColumns={2}
          columnWrapperStyle={{gap: 15}}
          contentContainerStyle={{
            gap: 15,
            alignContent: 'center',
            alignItems: 'center',
          }}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => setItemSelected(item)}
              disabled={itemSelected?.id === item.id}>
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderColor: colors.divider,
                  borderWidth: 1,
                  gap: 10,
                  backgroundColor:
                    itemSelected?.id === item.id
                      ? colors.primary.main
                      : 'transparent',
                }}>
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 100, height: 100}}
                  />
                </View>
                <View style={{justifyContent: 'space-evenly', gap: 10}}>
                  <MyText variant="medium">{item.name}</MyText>
                  <MyText variant="medium">
                    {helper.formatDisplayPoint(item.price, ' đ')}
                  </MyText>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Scan');
        }}
        style={{minWidth: 120, paddingVertical: 10, paddingHorizontal: 10}}>
        <MyText>Quét Mã CCCD Test</MyText>
      </TouchableOpacity>

      <Footer
        isShowButtonBack={false}
        labelButtonNext="Thanh toán"
        onPressNext={() => {
          if (itemSelected === null) {
            Alert.alert('Thông báo', 'Vui lòng chọn sản phẩm');
            return;
          }
          console.log('Thanh toán');
          navigation.navigate('Payment', {
            item: itemSelected,
          });
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
