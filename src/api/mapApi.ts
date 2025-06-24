import qs from 'qs';
import { publicAxios } from './axios';
import { ENDPOINT } from './urls';

export const getMarkersByDisplay = async (
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

  return response.data.data;
};

export const getMarkersByRegion = async (regionName: string) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_MARKERS_REGION(regionName));

  return res.data.data;
};

export const getMarkersByIdList = async (ids: number[]) => {
  const res = await publicAxios.get(ENDPOINT.SOLMAP_MARKERS_ID_LIST, {
    params: { ids },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return res.data.data;
};
