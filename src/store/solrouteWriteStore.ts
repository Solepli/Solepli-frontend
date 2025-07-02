import { create } from 'zustand';
import { MarkerInfoType, SolroutePlace, SolroutePlacePreview } from '../types';

interface SolrouteWriteState {
  icon: number | null;
  title: string | null;
  status: boolean;
  placeInfos: SolroutePlacePreview[]; // 정보 목록 저장
  placeCoords: MarkerInfoType[]; // 좌표 목록 저장
  nextMarkers: naver.maps.Marker[];
  prevMarkers: naver.maps.Marker[];
  setIcon: (icon: number) => void;
  setTitle: (title: string | null) => void;
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => void;
  addPlaceInfos: (placeInfos: SolroutePlacePreview) => void;
  deletePlaceInfo: (id: number) => void;
  setPlaceCoords: (placeCoords: MarkerInfoType[]) => void;
  addPlaceCoords: (placeCoords: MarkerInfoType) => void;
  deletePlaceCoords: (ids: number) => void;
  setMarkers: (nextMarkers: naver.maps.Marker[]) => void;
  //장소 검색에서 사용하는 함수
  addPlace: (place: SolroutePlace) => void;
}

export const useSolrouteWriteStore = create<SolrouteWriteState>((set, get) => ({
  iconId: null,
  icon: null,
  title: null,
  name: null,
  status: false,
  placeInfos: [],
  placeCoords: [],
  nextMarkers: [],
  prevMarkers: [],

  setIcon: (icon: number) => set({ icon }),
  setTitle: (title: string | null) => set({ title }),
  setStatus: (status: boolean) => set({ status }),
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => set({ placeInfos }),
  addPlaceInfos: (placeInfos: SolroutePlacePreview) =>
    set({ placeInfos: [...get().placeInfos, placeInfos] }),
  deletePlaceInfo: (id: number) => {
    const originInfos = get().placeInfos;
    const newInfos = originInfos.filter((v) => v.id != id);
    set({ placeInfos: newInfos });
  },
  setPlaceCoords: (placeCoords: MarkerInfoType[]) => set({ placeCoords }),
  addPlaceCoords: (placeCoords: MarkerInfoType) =>
    set({ placeCoords: [...get().placeCoords, placeCoords] }),
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

  addPlace: (place) => {
    const seq = get().placeInfos.length + 1;
    const isExisted = get().placeInfos.some((p) => p.id == place.id);
    if (isExisted) return;
    set({
      placeInfos: [...get().placeInfos, { ...place, seq, memo: '' }],
    });
  },
}));
