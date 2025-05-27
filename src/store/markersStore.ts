import { create } from 'zustand';
import { MarkersInfoType } from '../types';

interface markersState {
  markersInfo: MarkersInfoType[];
  setMarkersInfo: (places: MarkersInfoType[]) => void;

  markersObject: naver.maps.Marker[];
  setMarkersObject: (marker: naver.maps.Marker) => void;
  clearMarkersObject: () => void;
}

export const useMarkersStore = create<markersState>((set) => ({
  markersInfo: [],
  setMarkersInfo: (markersInfo) => set({ markersInfo: markersInfo }),

  markersObject: [],
  setMarkersObject: (marker) =>
    set((state) => ({
      markersObject: [...state.markersObject, marker],
    })),
  clearMarkersObject: () => set({ markersObject: [] }),
}));
