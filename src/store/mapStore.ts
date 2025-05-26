import { create } from 'zustand';
import { CurrentLatLng } from '../types';

interface MapState {
  currentLatLng: CurrentLatLng;
  setCurrentLatLng: (latlng: CurrentLatLng) => void;
}

export const useMapStore = create<MapState>((set) => ({
  currentLatLng: {
    swY: 0,
    swX: 0,
    neY: 0,
    neX: 0,
  },
  setCurrentLatLng: (latlng) => set({ currentLatLng: latlng }),
}));
