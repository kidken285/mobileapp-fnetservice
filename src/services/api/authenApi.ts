import {apiBase} from '@api';
import {METHOD} from '../../api/types';

import {API_LOGIN, API_REGISTER, getApiWithDomain} from '@app/constants';

export type RegisterInput = {
  fullName: string;
  passCode: string;
  phone: string;
  userName: string;
  gender: number;
};

export type LoginInput = {
  userName: string;
  passCode: string;
  token: string;
  ver: string;
  platform: string;
  fcm: string;
  deviceId: string;
  deviceName: string;
  modelName: string;
  hotfix: number;
};

export const registerApi = async (input: RegisterInput) => {
  try {
    console.log('input', input);

    const response = await apiBase(
      getApiWithDomain(API_REGISTER),
      METHOD.POST,
      input, // empty body for GET request
      {isFormBody: true}, // using JSON format
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
export const loginApi = async (input: LoginInput) => {
  try {
    console.log('input', input);

    const response = await apiBase(
      getApiWithDomain(API_LOGIN),
      METHOD.POST,
      input, // empty body for GET request
      {isFormBody: true}, // using JSON format
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
