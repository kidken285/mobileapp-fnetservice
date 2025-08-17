import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Payment: undefined;
  Scan: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
  Loading: undefined;
};
