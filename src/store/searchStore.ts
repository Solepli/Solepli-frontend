import { create } from 'zustand';

interface SearchState {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  isFocused: false,
  setIsFocused: (focused) => set({ isFocused: focused }),
  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),
}));

export default useSearchStore;
