import { create } from 'zustand';
import { MarkerInfoType } from '../types';
import {
  getMarkersByDisplay,
  getMarkersByIdList,
  getMarkersByRegion,
} from '../api/mapApi';
import { getPlaceDetail } from '../api/placeApi';
import { useMapStore } from './mapStore';

interface Filters {
  category: string | null;
  searchRegion: string | null; // 지역명
  searchPlaceId: number | null; // 장소id
  searchPlaceIdList: number[] | null; // 장소id리스트
  activeFilter:
    | 'category'
    | 'search-district'
    | 'search-place'
    | 'search-places'
    | '';
}

interface markerState {
  filters: Filters;
  searchByCategory: (category: string | null) => void;
  searchByRegion: (region: string) => void;
  searchByPlace: (placeId: number) => void;
  searchByPlaces: (placeIdList: number[]) => void;
  clearActiveFilter: () => void;
  getMapMarkerData: () => Promise<void>;

  markerInfos: MarkerInfoType[];
  updateMarkerIsMarked: (placeId: number, isMarked: boolean) => void;

  markerIdList: number[] | null;
  setMarkerIdList: (list: number[] | null) => void;

  newMarkerObjectList: naver.maps.Marker[] | null;
  setNewMarkerObjectList: (markers: naver.maps.Marker[] | null) => void;

  prevMarkerObjectList: naver.maps.Marker[] | null;
  setPrevMarkerObjectList: (markers: naver.maps.Marker[] | null) => void;
}

// ===================================================================
// ===================================================================

export const useMarkerStore = create<markerState>()((set, get) => ({
  filters: {
    category: null,
    searchRegion: null,
    searchPlaceId: null,
    searchPlaceIdList: null,
    activeFilter: 'category',
  },
  searchByCategory: (category) => {
    set({
      filters: {
        ...get().filters,
        category: category,
        activeFilter: 'category',
      },
    });
    get().getMapMarkerData();
  },
  searchByRegion: (region) => {
    set({
      filters: {
        ...get().filters,
        searchRegion: region,
        activeFilter: 'search-district',
      },
    });
    get().getMapMarkerData();
  },
  searchByPlace: (placeId) => {
    set({
      filters: {
        ...get().filters,
        searchPlaceId: placeId,
        activeFilter: 'search-place',
      },
    });
    get().getMapMarkerData();
  },
  searchByPlaces: (placeIdList) => {
    set({
      filters: {
        ...get().filters,
        searchPlaceIdList: placeIdList,
        activeFilter: 'search-places',
      },
    });
    get().getMapMarkerData();
  },
  clearActiveFilter: () => {
    set({
      filters: {
        ...get().filters,
        activeFilter: '',
      },
    });
    get().getMapMarkerData();
  },
  getMapMarkerData: async () => {
    const { filters } = get();
    const { lastBounds } = useMapStore.getState();
    let newMarkerInfos: MarkerInfoType[] = [];
    try {
      switch (filters.activeFilter) {
        case 'category':
          if (lastBounds) {
            newMarkerInfos = await getMarkersByDisplay(
              lastBounds,
              filters.category ?? undefined
            );
          }
          break;
        case 'search-district':
          newMarkerInfos = await getMarkersByRegion(filters.searchRegion!);
          break;
        case 'search-place':
          const data = await getPlaceDetail(filters.searchPlaceId!);
          newMarkerInfos[0] = {
            id: data.place.id,
            category: data.place.category,
            latitude: data.place.latitude,
            longitude: data.place.longitude,
          };
          if (data.place.isMarked !== undefined) {
            newMarkerInfos[0].isMarked = data.place.isMarked;
          }
          break;
        case 'search-places':
          newMarkerInfos = await getMarkersByIdList(filters.searchPlaceIdList!);
          break;
        default:
          newMarkerInfos = [];
          break;
      }
      set({ markerInfos: newMarkerInfos });
    } catch (error) {
      console.error('Failed to fetch map data:', error);
      set({ markerInfos: [] });
    }
  },

  markerInfos: [],
  updateMarkerIsMarked: (placeId, isMarked) => {
    set((state) => ({
      markerInfos: state.markerInfos.map((marker) =>
        marker.id === placeId ? { ...marker, isMarked } : marker
      ),
    }));
  },

  markerIdList: null,
  setMarkerIdList: (list) => set({ markerIdList: list }),

  newMarkerObjectList: null,
  setNewMarkerObjectList: (markers) => {
    const current = get().newMarkerObjectList;
    set({
      prevMarkerObjectList: current,
      newMarkerObjectList: markers ?? null,
    });
  },

  prevMarkerObjectList: null,
  setPrevMarkerObjectList: (markers) =>
    set({ prevMarkerObjectList: markers ?? null }),
}));
