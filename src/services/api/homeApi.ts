import {apiBase} from '@api';
import {METHOD} from '../../api/types';

import {API_DASHBOARD, API_SCANQR, getApiWithDomain} from '@app/constants';

export const dashBoardApi = async () => {
  try {
    const response = await apiBase(
      getApiWithDomain(API_DASHBOARD),
      METHOD.POST,
      {}, // empty body for GET request
      {}, // using JSON format
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
export const scanQRApi = async (input: any) => {
  try {
    const response = await apiBase(
      getApiWithDomain(API_SCANQR),
      METHOD.POST,
      input, // empty body for GET request
      {}, // using JSON format
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
