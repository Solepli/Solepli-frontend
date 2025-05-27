import { create } from 'zustand';
import { mapMarkerType } from '../types';

interface markerState {
  mapMarkers: mapMarkerType[];
  setMapMarkers: (places: mapMarkerType[]) => void;

  markedMarkers: naver.maps.Marker[];
  setMarkedMarkers: (marker: naver.maps.Marker) => void;
  clearMarkedMarkers: () => void;
}

export const useMarkerStore = create<markerState>((set) => ({
  mapMarkers: [],
  setMapMarkers: (mapMarkers) => set({ mapMarkers: mapMarkers }),

  markedMarkers: [],
  setMarkedMarkers: (marker) =>
    set((state) => ({
      markedMarkers: [...state.markedMarkers, marker],
    })),
  clearMarkedMarkers: () => set({ markedMarkers: [] }),
}));
