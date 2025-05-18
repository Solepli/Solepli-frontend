import { create } from 'zustand';
import { CurrentBoundsXY } from '../types';

interface BoundsStore {
  valueLngLat?: CurrentBoundsXY;
  setLngLat: (lnglat: CurrentBoundsXY) => void;
}

export const useBoundsStore = create<BoundsStore>((set) => ({
  valueLngLat: undefined,
  setLngLat: (lnglat) => set({ valueLngLat: lnglat }),
}));
