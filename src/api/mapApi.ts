import axios from 'axios';

export const fetchPlaceNearby = async (
  swLat: number,
  swLng: number,
  neLat: number,
  neLng: number,
  category: string | null
) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/solemap/markers`,
    {
      params: {
        swLat: swLat,
        swLng: swLng,
        neLat: neLat,
        neLng: neLng,
        category: category,
      },
    }
  );

  return response.data;
};
