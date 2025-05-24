import { publicAxios } from './axios';
import { ENDPOINT } from './urls';

export const fetchPlacesNearby = async (
  swX: number,
  swY: number,
  neX: number,
  neY: number,
  category?: string
) => {
  const response = await publicAxios.get(ENDPOINT.SOLMAP_MARKERS, {
    params: {
      swLng: swX,
      swLat: swY,
      neLng: neX,
      neLat: neY,
      category: category,
    },
  });

  console.log('response.data.data :::', response.data.data);

  return response.data.data;
};

export const fetchMockPlacesNearby = async () => {
  await new Promise((res) => setTimeout(res, 500));

  return mockPlacesNearby;
};

const mockPlacesNearby = {
  places: [
    {
      id: 123,
      latitude: 37.51123,
      longitude: 127.05845,
      category: '산책',
    },
    {
      id: 456,
      latitude: 37.51345,
      longitude: 127.06234,
      category: '카페',
    },
  ],
  categories: ['카페', '디저트', '공원', '산책'],
};
