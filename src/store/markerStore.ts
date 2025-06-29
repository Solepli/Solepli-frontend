import { create } from 'zustand';

interface markerState {
  markerIdList: number[] | null;
  setMarkerIdList: (list: number[] | null) => void;

  newMarkerObjectList: naver.maps.Marker[] | null;
  setNewMarkerObjectList: (markers: naver.maps.Marker[] | null) => void;

  prevMarkerObjectList: naver.maps.Marker[] | null;
  setPrevMarkerObjectList: (markers: naver.maps.Marker[] | null) => void;
}

export const useMarkerStore = create<markerState>()((set, get) => ({
  markerIdList: null,
  setMarkerIdList: (list) => set({ markerIdList: list }),

  newMarkerObjectList: null,
  setNewMarkerObjectList: (markers) => {
    const current = get().newMarkerObjectList;
    set({
      prevMarkerObjectList: current,
      newMarkerObjectList: markers ?? null,
    });
  },

  prevMarkerObjectList: null,
  setPrevMarkerObjectList: (markers) =>
    set({ prevMarkerObjectList: markers ?? null }),
}));
