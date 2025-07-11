import { create } from 'zustand';
import { DetailPlace, PreviewPlace } from '../types';

interface PlaceStore {
  places: PreviewPlace[];
  filteredPlaces: PreviewPlace[];
  recommendedPlaces: PreviewPlace[];
  selectedPlace: DetailPlace | null;
  selectedCategory: string | null;
  refreshTrigger: number;
  setPlaces: (places: PreviewPlace[]) => void;
  setRecommendedPlaces: (recommendedPlaces: PreviewPlace[]) => void;
  setCategory: (category: string | null) => void;
  clearCategory: () => void;
  setPlace: (place: DetailPlace) => void;
  increaseRefreshTrigger: () => void;

  clearPlaceStore: () => void;
}

export const usePlaceStore = create<PlaceStore>((set, get) => ({
  places: [],
  filteredPlaces: [],
  recommendedPlaces: [],
  selectedCategory: null,
  selectedPlace: null,
  refreshTrigger: 0,

  setPlaces: (places) => set({ places: places, filteredPlaces: places }),
  setCategory: (category) => {
    const { selectedCategory, places } = get();

    if (selectedCategory === category || category === null) {
      set({
        selectedCategory: null,
        filteredPlaces: places,
      });
    } else {
      set({
        selectedCategory: category,
        filteredPlaces: places.filter(
          (place) => place.detailedCategory === category
        ),
      });
    }
  },
  setRecommendedPlaces: (recommendedPlaces) =>
    set({ recommendedPlaces: recommendedPlaces }),
  clearCategory: () => {
    set((state) => ({
      selectedCategory: null,
      filteredPlaces: state.places,
    }));
  },
  setPlace: (place) => {
    set({ selectedPlace: place });
  },

  increaseRefreshTrigger: () => {
    set((state) => ({ refreshTrigger: state.refreshTrigger + 1 }));
  },

  clearPlaceStore : ()=>{
    set(() => ({
      places: [],
      filteredPlaces: [],
      recommendedPlaces: [],
      selectedCategory: null,
      selectedPlace: null,
      refreshTrigger: 0,
    }));
  }
}));
