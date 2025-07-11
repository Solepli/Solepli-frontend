import { create } from 'zustand';
import { placeSummary, SolmarkPlaceList } from '../types';

interface SolmarkStore {
  list: SolmarkPlaceList;
  places: placeSummary[];
  setList: (list: SolmarkPlaceList) => void;
  setPlaces: (places: placeSummary[]) => void;
  clearSolmarkStore: () => void;
}

export const useSolmarkStore = create<SolmarkStore>((set) => ({
  list: { collectionId: 1, collectionName: '', iconId: 0, placeCount: 0 },
  places: [],
  setList: (list) => set({ list: list }),
  setPlaces: (places) => set({ places: places }),
  clearSolmarkStore: () =>
    set({
      list: { collectionId: 1, collectionName: '', iconId: 0, placeCount: 0 },
      places: [],
    }),
}));
