/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, StyleSheet, Image} from 'react-native';
import {BaseToast} from 'react-native-toast-message';

export const CustomToast = {
  success: (props: any) => {
    return props.isVisible ? (
      <View style={style.toastSuccess}>
        <Image
          source={{uri: 'ic_success'}}
          style={style.icon_success}
          resizeMode="contain"
        />
        <BaseToast
          {...props}
          style={style.baseToastSuccess}
          contentContainerStyle={{
            paddingLeft: 6,
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: '500',
            color: white,
          }}
          text2Style={{
            fontSize: 14,
            fontWeight: '500',
            color: white,
          }}
          text2NumberOfLines={2}
        />
      </View>
    ) : null;
  },
  error: (props: any) => {
    return props.isVisible ? (
      <View style={style.toastSuccess}>
        <Image source={{uri: 'ic_check_error'}} resizeMode="contain" />
        <BaseToast
          {...props}
          style={style.baseToastSuccess}
          contentContainerStyle={{
            paddingLeft: 6,
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: '500',
            color: white,
          }}
          text2Style={{
            fontSize: 14,
            fontWeight: '500',
            color: white,
          }}
          text2NumberOfLines={2}
        />
      </View>
    ) : null;
  },
  warning: (props: any) => {
    return props.isVisible ? (
      <View style={style.toastSuccess}>
        <Image
          source={{uri: 'ic_check_warning'}}
          style={style.icon_success}
          resizeMode="contain"
        />
        <BaseToast
          {...props}
          text1NumberOfLines={3}
          style={style.baseToastSuccess}
          contentContainerStyle={{
            paddingLeft: 6,
          }}
          text1Style={{
            fontSize: 15,
            fontWeight: '500',
            color: white,
          }}
        />
      </View>
    ) : null;
  },
};
const white = 'white';
const bg_color = '#9D9D9D';

const style = StyleSheet.create({
  icon_success: {
    width: 20,
    height: 20,
  },
  baseToastSuccess: {
    backgroundColor: bg_color,
    borderLeftWidth: 0,
    elevation: 3,
    flex: 1,
    height: 42,
    // shadowColor: Colors.TRANSAPARENT,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  toastSuccess: {
    alignItems: 'center',
    backgroundColor: bg_color,
    // borderColor: Colors.GRAYF7,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
