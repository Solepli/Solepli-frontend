import axios from 'axios';

export const fetchPlacesNearby = async (
  swX: number,
  swY: number,
  neX: number,
  neY: number,
  category?: string
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/solemap/markers`,
    {
      params: {
        swLng: swX,
        swLat: swY,
        neLng: neX,
        neLat: neY,
        category: category,
      },
    }
  );

  console.log('res: ', response);

  return response.data;
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
