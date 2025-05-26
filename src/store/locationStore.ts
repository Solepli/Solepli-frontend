import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from 'react-router-dom';

interface LocationState {
  previousLocation: Location | null;
  targetSource: string | null;
  setPreviousLocation: (location: Location) => void;
  setTargetSource: (source: string) => void;
  clearLocation: () => void;
}

const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      previousLocation: null,
      targetSource: null,
      setPreviousLocation: (location) => set({ previousLocation: location }),
      setTargetSource: (source) => set({ targetSource: source }),
      clearLocation: () => set({ previousLocation: null, targetSource: null }),
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
