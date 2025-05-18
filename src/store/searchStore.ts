import { create } from 'zustand';

interface SearchState {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isFocused: false,
  setIsFocused: (focused) => set({ isFocused: focused }),
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}));
