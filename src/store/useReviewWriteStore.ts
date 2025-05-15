// src/stores/useReviewWriteStore.ts
import { create } from 'zustand';
import { Emoji, TagType } from '../types';

interface ReviewWriteState {
  emoji: Emoji;
  setEmoji: (emoji: Emoji) => void;

  rating: number;
  setRating: (value: number) => void;

  moodTags: TagType[];
  setMoodTags: (tags: TagType[]) => void;

  singleTags: TagType[];
  setSingleTags: (tags: TagType[]) => void;

  content: string;
  setContent: (value: string) => void;

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

  content: '',
  setContent: (value) => set({ content: value }),

  reset: () =>
    set({
      emoji: null,
      rating: 0,
      moodTags: [],
      singleTags: [],
      content: '',
    }),
}));

export default useReviewWriteStore;