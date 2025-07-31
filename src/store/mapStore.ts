import { create } from 'zustand';
import { LatLngType, MarkerInfoType } from '../types';

interface MapState {
  locationAccessStatus: boolean | null;
  setLocationAccessStatus: (b: boolean) => void;

  userLatLng: LatLngType | null;
  setUserLatLng: (center: LatLngType) => void;

  isSearchBounds: boolean;
  setIsSearchBounds: (b: boolean) => void;

  lastBounds: naver.maps.Bounds | undefined;
  setLastBounds: (bounds: naver.maps.Bounds | undefined) => void;

  lastZoom: number;
  setLastZoom: (zoom: number) => void;

  mapInstance: naver.maps.Map | null;
  setMapInstance: (map: naver.maps.Map | null) => void;

  fitCenterLocation: (lat: number, lng: number) => void;
  fitBoundsToMarkers: (markerInfos: MarkerInfoType[]) => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  locationAccessStatus: null,
  setLocationAccessStatus: (b) => set({ locationAccessStatus: b }),

  userLatLng: null,
  setUserLatLng: (latlng) => set({ userLatLng: latlng }),

  isSearchBounds: false,
  setIsSearchBounds: (b) => set({ isSearchBounds: b }),

  lastBounds: undefined,
  setLastBounds: (bounds) => set({ lastBounds: bounds }),

  lastZoom: 15,
  setLastZoom: (zoom) => set({ lastZoom: zoom }),

  mapInstance: null,
  setMapInstance: (map) => set({ mapInstance: map }),

  fitCenterLocation: (lat: number, lng: number) => {
    const { mapInstance } = get();
    if (!mapInstance) return;

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(lat, lng),
      new naver.maps.LatLng(lat, lng)
    );

    mapInstance.fitBounds(bounds, {
      bottom: 320,
      maxZoom: 18,
    });
  },

  fitBoundsToMarkers: (markerInfos: MarkerInfoType[]) => {
    const { mapInstance } = get();
    if (!mapInstance || !markerInfos.length) return;

    const bounds = new naver.maps.LatLngBounds(
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    markerInfos.forEach((marker) => {
      bounds.extend(new naver.maps.LatLng(marker.latitude, marker.longitude));
    });

    mapInstance.fitBounds(bounds, {
      bottom: markerInfos.length === 1 ? 320 : 48,
      maxZoom: 16,
    });
  },
}));
