import { create } from 'zustand';
import { Place } from '../types';

interface PlaceStore {
  places: Place[];
  filteredPlaces: Place[];
  selectedCategory: string | null;
  setPlaces: (places: Place[]) => void;
  setCategory: (category: string) => void;
  clearCategory: () => void;
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
  places: [],
  filteredPlaces: [],
  selectedCategory: null,

  setPlaces: (places) => set({ places: places, filteredPlaces: places }),
  setCategory: (category) => {
    const { selectedCategory, places } = get();

    if (selectedCategory === category) {
      set({
        selectedCategory: null,
        filteredPlaces: places,
      });
    } else {
      set({
        selectedCategory: category,
        filteredPlaces: places.filter(
          (place) => place.category.id === category
        ),
      });
    }
  },
  clearCategory: () => {
    set((state) => ({
      selectedCategory: null,
      filteredPlaces: state.places,
    }));
  },
}));
