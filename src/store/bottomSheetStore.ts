import { create } from 'zustand';
import { CATAGORY} from '../constants';

type BottomSheetState = {
  snap: number; // px 단위로 스냅 위치를 설정
  setSnap: (value: number) => void;
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  snap: CATAGORY, // 초기 스냅 위치를 CATAGORY_Y로 설정
  setSnap: (value) => set({ snap: value }),
}));
