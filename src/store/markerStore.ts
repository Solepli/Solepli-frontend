import { create } from 'zustand';
import { mapMarkerType } from '../types';

interface markerState {
  mapMarkers: mapMarkerType[];
  setMapMarkers: (places: mapMarkerType[]) => void;
}

export const useMarkerStore = create<markerState>((set) => ({
  mapMarkers: [],
  setMapMarkers: (mapMarkers) => set({ mapMarkers: mapMarkers }),
}));
