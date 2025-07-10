// src/stores/useReviewWriteStore.ts
import { create } from 'zustand';

interface ReviewWriteState {
  emoji: boolean | null;
  setEmoji: (emoji: boolean) => void;

  rating: number;
  setRating: (value: number) => void;

  moodTags: string[];
  setMoodTags: (tags: string[]) => void;

  singleTags: string[];
  setSingleTags: (tags: string[]) => void;

  text: string;
  setText: (value: string) => void;

  files: File[];
  setFiles: (files: File[]) => void;

  reset: () => void;
}

const useReviewWriteStore = create<ReviewWriteState>((set) => ({
  emoji: null,
  setEmoji: (emoji) => set({ emoji }),

  rating: 0,
  setRating: (value) => set({ rating: value }),

  moodTags: [],
  setMoodTags: (tags) => set({ moodTags: tags }),

  singleTags: [],
  setSingleTags: (tags) => set({ singleTags: tags }),

  text: '',
  setText: (value) => set({ text: value }),

  files: [],
  setFiles: (files) => set({ files }),

  reset: () =>
    set({
      emoji: null,
      rating: 0,
      moodTags: [],
      singleTags: [],
      text: '',
      files: [],
    }),
}));

export default useReviewWriteStore;
