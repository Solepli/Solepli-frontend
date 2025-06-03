import { create } from 'zustand';
import { LatLngType } from '../types';

interface MapState {
  initCenter: LatLngType;
  setInitCenter: (center: LatLngType) => void;

  isSearchBounds: boolean;
  setIsSearchBounds: (b: boolean) => void;

  lastBounds: naver.maps.Bounds | undefined;
  setLastBounds: (bounds: naver.maps.Bounds | undefined) => void;

  lastZoom: number;
  setLastZoom: (zoom: number) => void;
}

export const useMapStore = create<MapState>((set) => ({
  initCenter: {
    lat: 37.5666805, // 기본 좌표 (서울 시청)
    lng: 126.9784147,
  },
  setInitCenter: (latlng) => set({ initCenter: latlng }),

  isSearchBounds: false,
  setIsSearchBounds: (b) => set({ isSearchBounds: b }),

  lastBounds: undefined,
  setLastBounds: (bounds) => set({ lastBounds: bounds }),

  lastZoom: 16,
  setLastZoom: (zoom) => set({ lastZoom: zoom }),
}));
