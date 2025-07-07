import qs from 'qs';
import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const getMarkersByDisplay = async (
  swLat: number, // swY - min
  swLng: number, // swX
  neLat: number, // neY - max
  neLng: number, // neX
  category?: string
) => {
  const response = await privateAxios.get(ENDPOINT.SOLMAP_MARKERS, {
    params: {
      swLat,
      swLng,
      neLat,
      neLng,
      category,
    },
  });

  return response.data.data;
};

export const getMarkersByRegion = async (regionName: string) => {
  const res = await privateAxios.get(
    ENDPOINT.SOLMAP_MARKERS_REGION(regionName)
  );

  return res.data.data;
};

export const getMarkersByIdList = async (ids: number[]) => {
  const res = await privateAxios.get(ENDPOINT.SOLMAP_MARKERS_ID_LIST, {
    params: { ids },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: 'repeat' }),
  });

  return res.data.data;
};
