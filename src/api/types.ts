export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export enum HEADER {
  CONTENT_TYPE = 'content-type',
  CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded',
  CONTENT_TYPE_JSON = 'application/json',
  ACCEPT = 'accept',
  AUTHORIZATION = 'authorization',
}
export enum X_AUTHEN {
  DEFAULT_KEY_BEARER = 'Bearer 56c68381262b0951ec695e6d409097a3',
  XAUTHORIZATION = 'x-authorization',
  XHOST = 'x-host',
}
export type OPTIONS_REQUEST = {
  _timeout?: string;
  _headers?: any;
  isFormBody?: boolean;
};
export type CONFIG_APP = {
  accessToken?: string;
  deviceToken?: string;
};
