import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from 'react-router-dom';

interface LocationState {
  background: Location | null;
  targetSource: string | null;
  setBackground: (location: Location) => void;
  setTargetSource: (source: string) => void;
  clearLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      background: null,
      targetSource: null,
      setBackground: (location) => set({ background: location }),
      setTargetSource: (source) => set({ targetSource: source }),
      clearLocation: () => set({ background: null, targetSource: null }),
    }),
    {
      name: 'location-storage',
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useLocationStore;
