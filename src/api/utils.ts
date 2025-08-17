import {device, helper} from '@common';
import {
  STATUS_CODE_UNKNOW,
  STATUS_CODE_SUCCESS_200,
  STATUS_CODE_SUCCESS_300,
  STATUS_CODE_NETWORK_408,
  HOTFIX_TIME,
} from './constants';
import {translate} from './constants';
import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

export const setCustomError = (
  _code = STATUS_CODE_UNKNOW,
  _error = '',
  _reason = '',
) => {
  return {
    code: _code,
    error: _error,
    errorReason: _reason,
  };
};
export const setCustomBody = async (_body: any) => {
  console.log('setCustomBody', {
    ..._body,
    deviceId: await device.getDeviceId(),
    deviceName: await device.getDeviceName(),
    platform: Platform.OS,
    ver: device.getVersion(),
    hotfix: HOTFIX_TIME,
    modelName: device.getModelDevice(),
  });
  return {
    ..._body,
    deviceId: await device.getDeviceId(),
    deviceName: await device.getDeviceName(),
    platform: Platform.OS,
    ver: device.getVersion(),
    hotfix: HOTFIX_TIME,
    modelName: device.getModelDevice(),
  };
};

export const getQueryString = (params: any) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

export const getStatusNetwork = async () => {
  const isReachabilityInternet = await healtyCheck();
  console.log('IS_HAS_CONNECTED', isReachabilityInternet);
  if (isReachabilityInternet) return null;
  const networkState = await NetInfo.fetch();
  if (
    helper.hasProperty(networkState, 'isConnected') &&
    helper.hasProperty(networkState, 'type')
  ) {
    const {isConnected, isInternetReachable} = networkState;
    //state of wifi or 3g,4g,5g..
    if (isConnected) {
      const hasConnectedInternet = await healtyCheck(); // state of connective internet...
      console.log('GET STATUS NETWORK HEEEEE', hasConnectedInternet);
      if (hasConnectedInternet) {
        // Internet okie, and timeout.....
        return setCustomError(
          STATUS_CODE_NETWORK_408,
          'Network[408]',
          translate('error_time_out_withConnected'),
        );
      } else {
        // State of wifi or 4g has connected.But no internet here.
        return getMessageFromNetworkState(
          networkState.type,
          'Vui lòng kiểm tra lại đường truyền mạng.',
        );
      }
    }
    if (!isConnected) {
      console.log('AAAAALLLOO', networkState);
      return getMessageFromNetworkState(
        networkState.type,
        translate('no_connected'),
      );
    } else if (isInternetReachable === null) {
      return setCustomError(
        STATUS_CODE_NETWORK_408,
        'Network[408]',
        'Vui lòng kiểm tra lại đường truyền mạng.',
      );
    }
  }
  return null;
};

export const healtyCheck = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('https://clients3.google.com/generate_204', {
        method: 'POST',
      });
      const {status} = response;
      if (
        status >= STATUS_CODE_SUCCESS_200 &&
        status < STATUS_CODE_SUCCESS_300
      ) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      resolve(false);
    }
  });
};

const getMessageFromNetworkState = (networkState: any, defaultMsg = '') => {
  let msg = defaultMsg;
  switch (networkState.type) {
    case 'wifi':
      msg = translate('error_time_out_withConnectedWifi');
      break;
    case 'cellular':
      msg = translate('error_time_out_withConnectedCellular');
      break;
    default:
      break;
  }
  return setCustomError(STATUS_CODE_NETWORK_408, 'Network[408]', msg);
};
