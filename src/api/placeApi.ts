import { Place } from '../types';
import { publicAxios } from './axios';
import qs from 'qs';
import { ENDPOINT } from './urls';

export const fetchPlaces = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockPlaces;
};

export const getPlacesByDisplay = async (
  swLat: number, // swY - min
  swLng: number, // swX
  neLat: number, // neY - max
  neLng: number, // neX
  userLat: number,
  userLng: number,
  category?: string,
  cursorId?: number,
  cursorDist?: number,
  limit: number = 5
) => {
  const response = await publicAxios.get(ENDPOINT.SOLMAP_PLACE, {
    params: {
      swLat,
      swLng,
      neLat,
      neLng,
      userLat,
      userLng,
      category,
      cursorId,
      cursorDist,
      limit,
    },
  });

  return response.data.data;
};

export const getPlacesByRegion = async (
  regionName: string,
  userLat: number,
  userLng: number,
  category?: string,
  cursorId?: number,
  cursorDist?: number,
  limit: number = 5
) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_PLACE_REGION(regionName), {
    params: { userLat, userLng, category, cursorId, cursorDist, limit },
  });

  return res.data.data;
};

export const getPlaceByIdList = async (
  ids: number[],
  cursorId?: number,
  limit: number = 5
) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_PLACE_ID_LIST, {
    params: { ids, cursorId, limit },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return res.data.data;
};

export const getPlaceDetail = async (id: number) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_PLACE_DETAIL + id);

  return res.data.data;
};

export const getPlacesNearby = async (
  userLat: number,
  userLng: number,
  cursorId?: number,
  cursorDist?: number,
  limit: number = 5
) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_PLACE_NEARBY, {
    params: { userLat, userLng, cursorId, cursorDist, limit },
  });

  return res.data.data;
};

export const fetchPlaceById = async (id: number) => {
  // await new Promise((res) => setTimeout(res, 300));
  return mockPlaces[id];
};

const mockPlaces: Place[] = [
  {
    id: 1,
    title: '스타벅스 노량진동점',
    address: '서울 동작구 노량진로 190',
    latitude: 37.513213,
    longitude: 126.94656,
    category: { title: '카페', id: 'cafe' },
    rating: 4.5,
    tags: [
      { id: 'quiet', text: '조용한' },
      { id: 'lively', text: '시끌벅적한' },
      { id: 'cozy', text: '편안한' },
    ],
    hours: [
      { day: 0, startTime: '10:00', endTime: '20:30' },
      { day: 1, startTime: '10:00', endTime: '20:30' },
      { day: 2, startTime: '10:00', endTime: '20:30' },
      { day: 3, startTime: '10:00', endTime: '20:30' },
      { day: 4, startTime: '10:00', endTime: '20:30' },
      { day: 5, startTime: '10:00', endTime: '20:30' },
      { day: 6, startTime: '10:00', endTime: '17:00' },
    ],
  },

  {
    id: 2,
    title: '도로도로커피숍',
    address: '서울 동작구 노량진로 145 1층',
    latitude: 37.51388,
    longitude: 126.942058,
    category: { title: '카페', id: 'cafe' },
    rating: 4.2,
    tags: [
      { id: 'quiet', text: '조용한' },
      { id: 'lively', text: '시끌벅적한' },
      { id: 'cozy', text: '편안한' },
    ],
    hours: [
      { day: 0, startTime: '10:00', endTime: '20:30' },
      { day: 1, startTime: '10:00', endTime: '20:30' },
      { day: 2, startTime: '10:00', endTime: '20:30' },
      { day: 3, startTime: '10:00', endTime: '20:30' },
      { day: 4, startTime: '10:00', endTime: '20:30' },
      { day: 5, startTime: '10:00', endTime: '20:30' },
      { day: 6, startTime: '10:00', endTime: '17:00' },
    ],
  },
  {
    id: 3,
    title: '미분당',
    address: '서울 동작구 노량진로 190',
    latitude: 37.5132,
    longitude: 126.946,
    category: { title: '식당', id: 'food' },
    rating: 4.5,
    tags: [
      { id: 'luxurious', text: '고급스러운' },
      { id: 'unique', text: '색다른' },
      { id: 'hip', text: '힙한' },
    ],
    hours: [
      { day: 0, startTime: '10:00', endTime: '20:30' },
      { day: 1, startTime: '10:00', endTime: '20:30' },
      { day: 2, startTime: '10:00', endTime: '20:30' },
      { day: 3, startTime: '10:00', endTime: '20:30' },
      { day: 4, startTime: '10:00', endTime: '20:30' },
      { day: 5, startTime: '10:00', endTime: '20:30' },
      { day: 6, startTime: '10:00', endTime: '17:00' },
    ],
  },

  {
    id: 4,
    title: '샤브로',
    address: '서울 동작구 노량진로 145 1층',
    latitude: 37.513,
    longitude: 126.942,
    category: { title: '식당', id: 'food' },
    rating: 4.2,
    tags: [
      { id: 'luxurious', text: '고급스러운' },
      { id: 'unique', text: '색다른' },
      { id: 'hip', text: '힙한' },
    ],
    hours: [
      { day: 0, startTime: '10:00', endTime: '20:30' },
      { day: 1, startTime: '10:00', endTime: '20:30' },
      { day: 2, startTime: '10:00', endTime: '20:30' },
      { day: 3, startTime: '10:00', endTime: '20:30' },
      { day: 4, startTime: '10:00', endTime: '20:30' },
      { day: 5, startTime: '10:00', endTime: '20:30' },
      { day: 6, startTime: '10:00', endTime: '17:00' },
    ],
  },
];
