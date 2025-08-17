import {storage} from '@app/storage';

const PREFIX = '/mapi/client/app';
export const HOTFIX_TIME = 1739664000;
export const SERCET_TOKEN = 'ae8afc637f29e672b3e715e60660fa33';
export const API_REGISTER = `${PREFIX}/register`;
export const API_LOGIN = `${PREFIX}/oauth/token`;
export const API_DASHBOARD = `${PREFIX}/dashboard`;
export const API_SCANQR = `${PREFIX}/scanqr`;
export const API_PAYMENT_QR = `${PREFIX}/notification`;
export const getApiWithDomain = (api: string) => {
  const domain = storage.getString('domain');
  let fullApi = '';
  if (domain === null || domain === undefined) {
    const defaultDomain = 'https://fnet.supportonline.me';
    fullApi = `${defaultDomain}${api}`;
  }
  fullApi = `${domain}${api}`;
  console.log('getApiWithDomain', fullApi);
  return fullApi;
};
