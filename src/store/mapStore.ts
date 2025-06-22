import { create } from 'zustand';
import { LatLngType } from '../types';

interface MapState {
  userLatLng: LatLngType | null;
  setUserLatLng: (center: LatLngType) => void;

  isSearchBounds: boolean;
  setIsSearchBounds: (b: boolean) => void;

  lastBounds: naver.maps.Bounds | undefined;
  setLastBounds: (bounds: naver.maps.Bounds | undefined) => void;

  lastZoom: number;
  setLastZoom: (zoom: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  userLatLng: null,
  setUserLatLng: (latlng) => set({ userLatLng: latlng }),

  isSearchBounds: false,
  setIsSearchBounds: (b) => set({ isSearchBounds: b }),

  lastBounds: undefined,
  setLastBounds: (bounds) => set({ lastBounds: bounds }),

  lastZoom: 16,
  setLastZoom: (zoom) => set({ lastZoom: zoom }),
}));
