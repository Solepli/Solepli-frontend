import axios from 'axios';

export const fetchPlaceNearby = async (
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
