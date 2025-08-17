import {apiBase} from '@api';
import {METHOD} from '../../api/types';

import {getApiWithDomain, API_PAYMENT_QR} from '@app/constants';

export const paymentQrApi = async (input: any) => {
  try {
    const response = await apiBase(
      getApiWithDomain(API_PAYMENT_QR),
      METHOD.POST,
      {
        price: input,
      }, // empty body for GET request
      {}, // using JSON format
    );
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
