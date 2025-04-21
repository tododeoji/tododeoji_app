import axios from 'axios';
import { BASE_URL } from '@env';
import { getStorageData } from './mmkv';

const { accessToken, refreshToken } = getStorageData('userToken');

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}` || '',
    'Content-type': 'application/json',
  },
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('토큰만료: 새 토큰 요청 refreshToken: ', refreshToken);
      // 리프레시 토큰으로 새 액세스 토큰 요청
    }
    return Promise.reject(error);
  },
);
