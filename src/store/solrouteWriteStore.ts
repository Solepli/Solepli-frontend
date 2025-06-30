import { create } from 'zustand';
import { MarkerInfoType, SolroutePlacePreview } from '../types';

interface SolrouteWriteState {
  iconId: number | null;
  name: string | null;
  status: boolean;
  placeInfos: SolroutePlacePreview[]; // 정보 목록 저장
  placeCoords: MarkerInfoType[]; // 좌표 목록 저장
  nextMarkers: naver.maps.Marker[];
  prevMarkers: naver.maps.Marker[];
  setIconId: (iconId: number) => void;
  setName: (name: string | null) => void;
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => void;
  addPlaceInfos: (placeInfos: SolroutePlacePreview[]) => void;
  deletePlaceInfos: (ids: number) => void;
  setPlaceCoords: (placeCoords: MarkerInfoType[]) => void;
  addPlaceCoords: (placeCoords: MarkerInfoType[]) => void;
  deletePlaceCoords: (ids: number) => void;
  setMarkers: (nextMarkers: naver.maps.Marker[]) => void;
}

export const useSolrouteWriteStore = create<SolrouteWriteState>((set, get) => ({
  iconId: null,
  name: null,
  status: false,
  placeInfos: [],
  placeCoords: [],
  nextMarkers: [],
  prevMarkers: [],

  setIconId: (iconId: number) => set({ iconId }),
  setName: (name: string | null) => set({ name }),
  setStatus: (status: boolean) => set({ status }),
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => set({ placeInfos }),
  addPlaceInfos: (placeInfos: SolroutePlacePreview[]) =>
    set({ placeInfos: [...get().placeInfos, ...placeInfos] }),
  deletePlaceInfos: (ids: number) => {
    const originInfos = get().placeInfos;
    const newInfos = originInfos.filter((v) => v.placeId != ids);
    set({ placeInfos: newInfos });
  },
  setPlaceCoords: (placeCoords: MarkerInfoType[]) => set({ placeCoords }),
  addPlaceCoords: (placeCoords: MarkerInfoType[]) =>
    set({ placeCoords: [...get().placeCoords, ...placeCoords] }),
  deletePlaceCoords: (ids: number) => {
    const originCoords = get().placeCoords;
    const newCoords = originCoords.filter((v) => v.id != ids);
    set({ placeCoords: newCoords });
  },
  setMarkers: (nextMarkers: naver.maps.Marker[]) => {
    const currentMarkers = get().nextMarkers;
    set({ prevMarkers: currentMarkers });
    set({ nextMarkers });
  },
}));
