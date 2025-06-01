import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
// import { MarkersInfoType } from '../types';

interface markersState {
  // markersInfo: MarkersInfoType[];
  // setMarkersInfo: (places: MarkersInfoType[]) => void;

  markerObjectList: naver.maps.Marker[];
  setMarkerObjectList: (marker: naver.maps.Marker[]) => void;
  clearMarkerObjectList: () => void;
}

export const useMarkersStore = create<markersState>()(
  // markersInfo: [],
  // setMarkersInfo: (markersInfo) => set({ markersInfo: markersInfo }),
  subscribeWithSelector((set) => ({
    markerObjectList: [],
    setMarkerObjectList: (marker) => set({ markerObjectList: marker }),
    clearMarkerObjectList: () => set({ markerObjectList: [] }),
  }))
);
