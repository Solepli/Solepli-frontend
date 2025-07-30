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

let isRefreshing = false;
let requestQueue: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any;
}[] = [];

function refreshAuthToken() {
  return axios.post(BASE_URL + '/api/auth/reissue-token', null, {
    withCredentials: true,
  });
}

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, config: originalRequest });

        if (!isRefreshing) {
          isRefreshing = true;

          refreshAuthToken()
            .then((res) => {
              const newToken = res.data.accessToken;
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
