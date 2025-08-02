import axios from 'axios';
import { BASE_URL } from './urls';
import authStore from '../store/authStore';

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

let isRefreshing = false;
let requestQueue: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}[] = [];

// dev 환경에서는 baseURL을 빈 문자열로 설정해 프록시를 이용하도록 함
// 기존에 생성한 privateAxios를 이용하면 무한 루프가 발생할 수 있으므로 새로운 axios 인스턴스를 생성
function refreshAuthToken() {
  const baseURL = import.meta.env.DEV ? '' : BASE_URL;
  return axios.post('/api/auth/reissue-token', null, {
    baseURL,
    withCredentials: true,
  });
}

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    const isLoggedIn = authStore.getState().isLoggedIn;

    if (isLoggedIn && response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, config: originalRequest });

        if (!isRefreshing) {
          isRefreshing = true;

          refreshAuthToken()
            .then((res) => {
              const newToken = res.data.data.accessToken;
              localStorage.setItem('accessToken', newToken);

              // 큐에 쌓인 모든 요청 다시 실행
              requestQueue.forEach(({ resolve, config }) => {
                config.headers.Authorization = `Bearer ${newToken}`;
                resolve(privateAxios(config));
              });
              requestQueue = [];
            })
            .catch((err) => {
              requestQueue.forEach(({ reject }) => reject(err));
              requestQueue = [];
              localStorage.removeItem('accessToken');
              window.location.replace('/login');
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
      });
    }

    return Promise.reject(error);
  }
);
