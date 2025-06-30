import { create } from 'zustand';

interface SollectStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clearCategory: () => void;
}

export const useSollectStore = create<SollectStore>((set) => ({
  selectedCategory: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearCategory: () => set({ selectedCategory: '' }),
}));
