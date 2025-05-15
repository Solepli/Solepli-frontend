// src/stores/useEmojiStore.ts
import { create } from 'zustand';
import { Emoji } from '../types';

interface EmojiState {
  selectedEmoji: Emoji;
  selectEmoji: (emoji: Emoji) => void;
  resetEmoji: () => void;
}

const useEmojiStore = create<EmojiState>((set) => ({
  selectedEmoji: null,
  selectEmoji: (emoji) => set({ selectedEmoji: emoji }),
  resetEmoji: () => set({ selectedEmoji: null }),
}));

export default useEmojiStore;