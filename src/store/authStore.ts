import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  loginType: string;
  nickname: string;
  profileImageUrl: string;
  setUserInfo: (info: { loginType: string; nickname: string; profileImageUrl: string }) => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      loginType: '',
      nickname: '',
      profileImageUrl: '',

      login: () => {
        const userLocalStorage = localStorage.getItem('accessToken');
        if (userLocalStorage) {
          set({ isLoggedIn: true });
        }
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
      setUserInfo: ({ loginType, nickname, profileImageUrl }) => {
        set({ loginType, nickname, profileImageUrl });
      },
    }),
    {
      name: 'userLoginStatus',
    }
  )
);


export default useAuthStore;