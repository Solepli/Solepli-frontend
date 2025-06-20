import { privateAxios, publicAxios } from './axios';
import { ENDPOINT } from './urls';

export const getRelatedSearchWords = async (
  keyword: string,
  userLat: number,
  userLng: number
) => {
  try {
    const res = await publicAxios.get(ENDPOINT.RELATED_SEARCH, {
      params: {
        keyword: keyword,
        userLat: userLat,
        userLng: userLng,
      },
    });
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteRecentSearchWords = async (
  mode: string,
  keyword: string
) => {
  try {
    const res = await privateAxios.delete(
      ENDPOINT.RECENT_SEARCH.DELETE(mode, keyword)
    );
  } catch (e) {
    console.log(e);
  }
};

export const getRecentSearchWords = async (mode: string) => {
  try {
    const res = await privateAxios.get(ENDPOINT.RECENT_SEARCH.GET(mode));

    return res.data.data as string[];
  } catch (e) {
    console.log(e);
  }
};

export const postRecentSearchWord = async (
  inputValue: string,
  mode: string
) => {

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return;

  try {
    await privateAxios.post(ENDPOINT.RECENT_SEARCH.POST(mode), {
      keyword: inputValue,
    });
  } catch (e) {
    console.log(e);
  }
};
