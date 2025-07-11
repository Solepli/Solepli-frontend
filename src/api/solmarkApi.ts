import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const fetchPlaceCollections = async () => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLMARK_PLACE_COLLECTION);
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchPlacesByCollectionId = async (collectionId: number) => {
  try {
    const res = await privateAxios.get(
      ENDPOINT.SOLMARK_PLACE_COLLECTION_PLACES(collectionId)
    );
    return res.data.data.places;
  } catch (e) {
    console.log(e);
  }
};

export const patchSolmark = async (
  placeId: number,
  addCollectionIds: number[],
  removeCollectionIds: number[]
) => {
  try {
    const res = await privateAxios.patch(ENDPOINT.SOLMARK_PLACE(placeId), {
      addCollectionIds,
      removeCollectionIds,
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSolmarkSollect = async (cursorId?: number) => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLMARK_SOLLECT, {
      params: {
        cursorId: cursorId,
        size: undefined,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchMySolmarkSollect = async (cursorId?: number) => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLMARK_MY_SOLLECT, {
      params: {
        cursorId: cursorId,
        size: undefined,
      },
    });
    console.log(res.data.data.contents);
    return res.data.data.contents;
  } catch (e) {
    console.log(e);
  }
};
