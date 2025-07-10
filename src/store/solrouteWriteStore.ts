import { create } from 'zustand';
import { PlaceInfo, SolroutePlacePreview } from '../types';

interface SolrouteWriteState {
  icon: number | null;
  title: string | null;
  status: boolean;
  placeInfos: SolroutePlacePreview[]; // 정보 목록 저장
  nextMarkers: naver.maps.Marker[];
  prevMarkers: naver.maps.Marker[];
  setIcon: (icon: number) => void;
  setTitle: (title: string | null) => void;
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => void;
  setPlaceMemo: (id: number, str: string) => void;
  addPlace: (place: PlaceInfo) => void; //장소 검색에서 사용하는 함수
  deletePlaceInfo: (id: number) => void;
  setMarkers: (nextMarkers: naver.maps.Marker[]) => void;
  reset: () => void;
}

export const useSolrouteWriteStore = create<SolrouteWriteState>((set, get) => ({
  icon: null,
  title: null,
  status: false,
  placeInfos: [],
  nextMarkers: [],
  prevMarkers: [],

  setIcon: (icon: number) => set({ icon }),
  setTitle: (title: string | null) => set({ title }),
  setStatus: (status: boolean) => set({ status }),
  setPlaceInfos: (placeInfos: SolroutePlacePreview[]) => set({ placeInfos }),
  setPlaceMemo: (id: number, str: string) => {
    set((state) => ({
      placeInfos: state.placeInfos.map((place) =>
        place.id === id ? { ...place, memo: str } : place
      ),
    }));
  },
  addPlace: (place) => {
    const seq = get().placeInfos.length + 1;
    const isExisted = get().placeInfos.some((p) => p.id == place.id);
    if (isExisted) return;
    set({
      placeInfos: [...get().placeInfos, { ...place, seq, memo: '' }],
    });
  }, 
  deletePlaceInfo: (id: number) => {
    const originInfos = get().placeInfos;
    const newInfos = originInfos.filter((v) => v.id != id);
    set({ placeInfos: newInfos });
  },
  setMarkers: (nextMarkers: naver.maps.Marker[]) => { 
    const currentMarkers = get().nextMarkers;
    set({ prevMarkers: currentMarkers });
    set({ nextMarkers });
  },
  reset: () =>
    set({
      icon: null,
      title: null,
      status: false,
      placeInfos: [],
      nextMarkers: [],
      prevMarkers: [],
    }), 
}));
