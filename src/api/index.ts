import {OPTIONS_REQUEST, CONFIG_APP} from './types';
import {helper} from '@common';

import {
  CONTENT_TYPE,
  CONTENT_TYPE_FORM,
  AUTHORIZATION,
  STATUS_CODE_TIMEOUT,
  STATUS_CODE_UNKNOW,
  STATUS_CODE_SUCCESS_200,
  STATUS_CODE_SUCCESS_300,
  STATUS_CODE_CONTENT_204,
  STATUS_CODE_CONTENT_205,
  STATUS_CODE_SEVER_ERROR,
  TIME_OUT,
  INIT_HEADERS_JSON,
  STATUS_CODE_INVAILD_TOKEN,
  STATUS_CODE_SUCCESS_403,
} from './constants';

import {getQueryString, setCustomError, getStatusNetwork} from './utils';

let _accessToken = '';
let _deviceToken = '';
export * from './utils';
export const configureTokenApp = (secretOptions: CONFIG_APP) => {
  try {
    const {accessToken, deviceToken} = secretOptions;
    if (accessToken) {
      _accessToken = accessToken;
    }
    if (deviceToken) {
      _deviceToken = deviceToken;
    }
    return 'Wonderful';
  } catch (error) {
    return 'Bad new';
  }
};
export const revokeSecretKey = () => {};
export * from './constants';
import {translate} from './constants';
import {storage} from '@storage';

import {isString} from 'lodash';
import {Alert} from 'react-native';
const timeout = (time: number, promise: any) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      // Cancel the timeout if necessary
      clearTimeout(timeoutId);
      return reject(
        setCustomError(
          STATUS_CODE_TIMEOUT,
          translate('error_time_out_withConnected'),
          translate('error_time_out_withConnected'),
        ),
      );
    }, time);
    promise.then(resolve, reject);
  });
};

const checkStatus = (response: any) => {
  console.log('checkStatus', response.status);
  if (
    response.status >= STATUS_CODE_SUCCESS_200 &&
    response.status < STATUS_CODE_SUCCESS_300
  ) {
    return response;
  }

  if (response.status === STATUS_CODE_SUCCESS_403) {
    return Promise.reject(
      setCustomError(
        STATUS_CODE_INVAILD_TOKEN,
        'STATUS_CODE_INVAILD_TOKEN',
        'Phiên đăng nhập bạn đã hết hiệu lực.',
      ),
    );
  }

  // Error with another exception 401, 403, 500... handle here
  return response
    .json()
    .then((json: any) => {
      console.log('checkStatus: ', json);
      const status = helper.hasProperty(response, 'status')
        ? response.status
        : -1;

      if (status === STATUS_CODE_SEVER_ERROR || status === -1) {
        return Promise.reject(
          setCustomError(
            STATUS_CODE_SEVER_ERROR,
            'Lỗi Sever: ',
            translate('error_server'),
          ),
        );
      }
      const error = helper.hasProperty(json, 'error') ? json.error : '';
      let msgError = '';
      if (helper.hasProperty(json, 'error_description')) {
        msgError += json.error_description;
      }
      if (helper.hasProperty(json, 'errorReason')) {
        msgError += json.errorReason;
      }
      return Promise.reject(setCustomError(response.status, error, msgError));
    })
    .catch((error: any) => {
      if (helper.hasProperty(error, 'code')) {
        return Promise.reject(error);
      } else {
        return Promise.reject(setCustomError(0, translate('error_server')));
      }
    });
};

const handleError = async (error: any) => {
  if (error && error?.code === STATUS_CODE_INVAILD_TOKEN) {
    Alert.alert('Thông báo', 'Phiên đăng nhập bạn đã hết hiệu lực.', [
      {
        text: 'Đăng nhập lại',
        onPress: () => {},
      },
    ]);
  }

  if (
    (error && error?.code === STATUS_CODE_TIMEOUT) ||
    error.toString().includes('Network request failed')
  ) {
    const networkResult = await getStatusNetwork();
    console.log('get network here', networkResult);
    if (networkResult !== null) {
      await helper.sleep(1000);
      return networkResult;
    }

    return Promise.reject(error);
  }
  console.log('asldkjalskdjas', error);
  return Promise.reject(
    setCustomError(
      STATUS_CODE_UNKNOW,
      error.error ?? 'Có lỗi phát sinh',
      error.errorReason ?? 'Có lỗi phát sinh',
    ),
  );
};

const parseJSON = async (response: any) => {
  if (
    response.status === STATUS_CODE_CONTENT_204 ||
    response.status === STATUS_CODE_CONTENT_205
  ) {
    return null;
  }
  return await response.json();
};

export const apiBase = async (
  url: string,
  method: string,
  body: any,
  options: OPTIONS_REQUEST,
) => {
  try {
    const {isFormBody} = {...options};
    const headers = new Headers(INIT_HEADERS_JSON);
    const token = storage.getString('accessToken');
    if (isFormBody) {
      headers.set(CONTENT_TYPE, CONTENT_TYPE_FORM);
    }
    if (isString(token) && token.length > 0) {
      const authen = `Bearer ${token}`;
      headers.set(AUTHORIZATION, authen);
    }
    console.log('url', url);
    console.log('headers', headers);
    console.log('body', body);
    switch (headers.get(CONTENT_TYPE)) {
      case CONTENT_TYPE_FORM:
        body = getQueryString(body);
        break;
      default:
        body = JSON.stringify(body);
        break;
    }

    // var startTime = new Date().getTime();
    const rawResponse = await timeout(
      TIME_OUT,
      fetch(url, {
        method,
        headers,
        body,
      }),
    );
    await checkStatus(rawResponse);
    const response = await parseJSON(rawResponse);
    console.log('RESPONSE_API', response);
    // const endTime = new Date().getTime();
    // LoggerAPI([{
    //     duration: endTime - startTime,
    //     url: url,
    //     method: method,
    //     body: body,
    //     status: 200,
    //     response: response
    // }])
    //api :  {"data":[],"result":0,"err":1,"errMsg":"Invalid 1!"}
    const {result, err, errMsg} = response;
    if (result === 0 && isString(errMsg) && errMsg.length > 0) {
      if (err > 0) {
        const msgErr = `${errMsg} (err: ${err})`;
        throw setCustomError(STATUS_CODE_UNKNOW, msgErr, msgErr);
      }
      throw setCustomError(STATUS_CODE_UNKNOW, errMsg, errMsg);
    }
    if (result === -1 && isString(errMsg) && errMsg.length > 0) {
      //force_login
      throw setCustomError(
        STATUS_CODE_INVAILD_TOKEN,
        'STATUS_CODE_INVAILD_TOKEN',
        'Phiên đăng nhập bạn đã hết hiệu lực.',
      );
    }
    return response;
  } catch (error) {
    // const endTime = new Date().getTime();
    // LoggerAPI([{
    //     duration: endTime - startTime,
    //     url: url,
    //     method: method,
    //     body: body,
    //     response: error
    // }])
    const _error = await handleError(error);
    throw _error;
  }
};
