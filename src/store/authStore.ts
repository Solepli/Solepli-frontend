import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}
const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
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
        }),
        {
            name: 'userLoginStatus',
        }
    )
);


export default useAuthStore;