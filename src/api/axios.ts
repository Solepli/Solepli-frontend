import axios from 'axios';
import { BASE_URL } from './urls';

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//privateAxios에  토큰이  없다면 로그인 페이지로 리다이렉트
privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        console.warn('토큰이 유효하지 않습니다. ');
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // 또는 navigate('/login')
      }
    }
    return Promise.reject(error);
  }
);
