// Declear const for status code for app.
export const STATUS_CODE_EXPRIED = 401;
export const STATUS_CODE_SUCCESS_200 = 200;
export const STATUS_CODE_SUCCESS_300 = 300;
export const STATUS_CODE_SUCCESS_403 = 403;
export const STATUS_CODE_CONTENT_204 = 204;
export const STATUS_CODE_CONTENT_205 = 205;
export const STATUS_CODE_SEVER_ERROR = 500;
export const STATUS_CODE_UNKNOW = -1;
export const STATUS_CODE_INVAILD_TOKEN = 1000;
export const STATUS_CODE_TIMEOUT = 1001; // Your error code here.. Default set 1000 + number
export const STATUS_CODE_SUCCESS_WITH_ERROR = 1002;
export const STATUS_CODE_SUCCESS_WITH_ABORT = 1003;
export const STATUS_CODE_FAILED_NETWORK = 1004;
export const STATUS_CODE_FAILED_UPLOAD = 1009; // error upload image file
export const STATUS_CODE_MOBLIE_NETWORK = 408; // error upload image file
export const STATUS_CODE_NETWORK = 1400; // network problem
export const STATUS_CODE_NETWORK_404 = 1404; // network problem
export const STATUS_CODE_NETWORK_408 = 1408; // network problem
export const STATUS_CODE_INVALID_TOKEN = 1401; // network problem

export const STATUS_CODE = {
  STATUS_CODE_SUCCESS_WITH_ERROR,
  STATUS_CODE_MOBLIE_NETWORK,
  STATUS_CODE_NETWORK,
  STATUS_CODE_SEVER_ERROR,
};

// Declear const for status code for app.
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';
export const TIME_OUT = 7000;
export const CONTENT_TYPE = 'content-type';
export const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';
export const CONTENT_TYPE_JSON = 'application/json';

export const ACCEPT = 'Accept';
export const AUTHORIZATION = 'Authorization';
export const DEVICE_TOKEN = 'DeviceToken';
export const LANGUAGE = 'language';
export const X_AJAX_CALL = 'X-Ajax-Call';

export const HEADER = {
  CONTENT_TYPE,
  CONTENT_TYPE_FORM,
  CONTENT_TYPE_JSON,
};

export const METHOD = {
  GET,
  POST,
  PUT,
  DELETE,
};

export const INIT_HEADERS_JSON: any = [
  [CONTENT_TYPE, 'application/json'],
  [ACCEPT, 'application/json'],
];
import fetchAPIVI from './translate/vi';
export const translate = (key = '') => {
  return fetchAPIVI[key];
};

export const HOTFIX_TIME = 1739664000;
