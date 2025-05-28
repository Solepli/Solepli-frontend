import axios from 'axios';
import { useSearchStore } from '../store/searchStore';
import { privateAxios, publicAxios } from './axios';
import { ENDPOINT } from './urls';

// export const fetchRecentSearchWords = async () => {
//   await new Promise((res) => setTimeout(res, 500));
//   return mockRecentSearchWords;
// };

// export const deleteRecentSearchWords = async (keyword: string) => {
//   // 하드 코딩으로 mockRecentSearchWords의 검색어 삭제
//   mockRecentSearchWords = mockRecentSearchWords.filter((w) => w !== keyword);
//   return mockRecentSearchWords;
// };

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
    console.log(res);
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
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

// let mockRecentSearchWords: string[] = ['강남구', '돈까스', '성수동'];

export const fetchRecentSearchWords = async (mode: string) => {
  try {
    const res = await privateAxios.get(ENDPOINT.RECENT_SEARCH.GET(mode));

    console.log(res.data.data);

    return res.data.data as string[];
  } catch (e) {
    console.log(e);
  }
};

export const postRecentSearchWord = async (
  inputValue: string,
  mode: string
) => {
  try {
    console.log(inputValue);
    const res = await privateAxios.post(ENDPOINT.RECENT_SEARCH.POST(mode), {
      keyword: inputValue,
    });
  } catch (e) {
    console.log(e);
  }
};
