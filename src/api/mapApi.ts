import { publicAxios } from './axios';
import { ENDPOINT } from './urls';

export const getDisplayMarkers = async (
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
