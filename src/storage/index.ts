import { MMKV } from 'react-native-mmkv';


const MMKV_ENCRYPTION_KEY = '1NmMV9CkqcJ4KCkeDFpkLjUsNLY53G4Z';

// Create a new MMKV instance with secure configuration
export const storage = new MMKV({
    id: 'auth-storage',
    encryptionKey: MMKV_ENCRYPTION_KEY,
});


export const getObjectStorage = (key: string) => {
    try {
        if (key === undefined || key === null) {
            return null;
        }
        // Deserialize the JSON string into an object
        const jsonObj = storage.getString(key) ?? '';
        const valueObject = JSON.parse(jsonObj);
        return valueObject;
    } catch (error) {
        return null;
    }
};