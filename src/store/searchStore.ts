import { create } from 'zustand';
import { PlaceInfo, RelatedSearchWord } from '../types';

interface SearchState {
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;

  inputValue: string;
  setInputValue: (value: string) => void;

  relatedSearchList: RelatedSearchWord[];
  setRelatedSearchList: (list: RelatedSearchWord[]) => void;

  relatedSearchPlaceList: PlaceInfo[];
  setRelatedSearchPlaceList: (list: PlaceInfo[]) => void;

  selectedRegion: string;
  setSelectedRegion: (value: string) => void;

  relatedPlaceIdList: number[];
  setRelatedPlaceIdList: (list: number[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isFocused: false,
  setIsFocused: (focused) => set({ isFocused: focused }),

  inputValue: '',
  setInputValue: (value) => set({ inputValue: value }),

  relatedSearchList: [],
  setRelatedSearchList: (list) => set({ relatedSearchList: list }),

  relatedSearchPlaceList: [],
  setRelatedSearchPlaceList: (list) => set({ relatedSearchPlaceList: list }),

  selectedRegion: '',
  setSelectedRegion: (value) => set({ selectedRegion: value }),

  relatedPlaceIdList: [],
  setRelatedPlaceIdList: (value) => set({ relatedPlaceIdList: value }),
}));
