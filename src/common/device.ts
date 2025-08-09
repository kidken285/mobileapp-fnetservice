import DeviceInfo from 'react-native-device-info';

export const getVersion = () => DeviceInfo.getVersion();
export const getDeviceId = async () => await DeviceInfo.getUniqueId();
export const getDeviceName = async () => await DeviceInfo.getDeviceName();
export const getModelDevice =  () => DeviceInfo.getModel();


