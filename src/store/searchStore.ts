import { create } from 'zustand';

interface SearchState {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  isFocused: false,
  setIsFocused: (focused) => set({ isFocused: focused }),
}));

export default useSearchStore;
