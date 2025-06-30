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
    const res = await privateAxios.get(ENDPOINT.SOLMARK_PLACE_COLLECTION_PLACES(collectionId));
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
