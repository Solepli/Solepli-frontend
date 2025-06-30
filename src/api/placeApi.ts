import { publicAxios } from './axios';
import qs from 'qs';
import { ENDPOINT } from './urls';

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
