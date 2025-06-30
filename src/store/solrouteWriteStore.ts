import { create } from 'zustand';
import { SolroutePlace } from '../types';

interface SolrouteWriteState {
  title: string | null;
  icon: number | null;
  places: SolroutePlace[]; // 장소 ID 목록을 저장하는 속성
}

export const useSolrouteWriteStore = create<SolrouteWriteState>((set) => ({
  title: null, // 제목을 저장하는 속성
  places: [], // 장소 ID 목록을 저장하는 속성
  icon: null, // 아이콘 번호를 저장하는 속성

  setTitle: (title: string | null) => set({ title }),
  setIcon: (icon: number) => set({ icon }),
  setPlaces: (places: SolroutePlace[]) => set({ places }),
}));
