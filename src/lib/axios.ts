import axios from 'axios';
import { BASE_URL } from '@env';
import { getStorageData } from './mmkv';

const getToken = () => {
  const { accessToken } = getStorageData('userToken');
  return accessToken || '';
};

export const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // 500 미만의 모든 상태 코드를 유효한 응답으로 처리
  },
});

// 요청 인터셉터
Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
Axios.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  async (error) => {
    console.error('Response Error:', {
      message: error.message,
      code: error.code,
      response: error.response,
      request: error.request,
    });

    if (error.code === 'ECONNABORTED') {
      console.log('요청 시간 초과');
      return Promise.reject(new Error('요청 시간이 초과되었습니다.'));
    }

    if (!error.response) {
      console.log('네트워크 에러');
      return Promise.reject(new Error('네트워크 연결을 확인해주세요.'));
    }

    if (error.response?.status === 401) {
      const { refreshToken } = getStorageData('userToken');
      console.log('토큰만료: 새 토큰 요청 refreshToken: ', refreshToken);
      // 리프레시 토큰으로 새 액세스 토큰 요청 로직 구현
    }

    return Promise.reject(error);
  },
);
