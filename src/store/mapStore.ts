import { create } from 'zustand';
import { DisplayLatLng } from '../types';

interface MapState {
  diplayLatLng: DisplayLatLng;
  setDisplayLatLng: (latlng: DisplayLatLng) => void;
}

export const useMapStore = create<MapState>((set) => ({
  diplayLatLng: {
    swY: 0,
    swX: 0,
    neY: 0,
    neX: 0,
  },
  setDisplayLatLng: (latlng) => set({ diplayLatLng: latlng }),
}));
