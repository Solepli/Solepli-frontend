import { create } from 'zustand';
import { SollectPhotoType } from '../types';

interface SollectStore {
  selectedCategory: string;
  sollects: SollectPhotoType[];
  setSelectedCategory: (category: string) => void;
  clearCategory: () => void;
  setSollects: (sollects: SollectPhotoType[]) => void;

  clearSollectStore: () => void;
}

export const useSollectStore = create<SollectStore>((set) => ({
  selectedCategory: '',
  sollects: [],
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearCategory: () => set({ selectedCategory: '' }),
  setSollects: (sollects) => set({ sollects: sollects }),
  clearSollectStore: () =>
    set({
      selectedCategory: '',
      sollects: [],
    }),
}));
