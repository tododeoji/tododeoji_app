import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

export const getStorageData = (key: string) => {
  const res = storage.getString(key);
  const parseRes = JSON.parse(res || '[]');

  return parseRes;
};
