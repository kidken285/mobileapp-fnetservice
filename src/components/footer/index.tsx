import metrics from '@app/theme/metrics';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MyText from '../text';
import colors from '@app/theme/colors';
import MyIcon from '../icon/MyIcon';

const Footer = ({
  labelButtonNext,
  onPressBack,
  onPressNext,
}: {
  labelButtonNext: string;
  onPressBack?: () => void;
  onPressNext?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.separate,
      }}>
      <TouchableOpacity onPress={onPressBack}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              backgroundColor: colors.primary.main,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MyIcon
              family="Ionicons"
              name="chevron-back-outline"
              size={20}
              color="#fff"
            />
          </View>
          <MyText>Trở lại</MyText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressNext}
        style={{
          borderRadius: 24,
          borderColor: colors.separate,
          borderWidth: 1,
          padding: 10,
          paddingHorizontal: 40,
        }}>
        <MyText variant="medium" style={{color: colors.text.primary}}>
          {labelButtonNext}
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
