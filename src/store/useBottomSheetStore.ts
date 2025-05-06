import { create } from 'zustand';

type BottomSheetState = {
  snap: number; // px 단위로 스냅 위치를 설정
  setSnap: (value: number) => void;
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  snap: 350,
  setSnap: (value) => set({ snap: value }),
}));