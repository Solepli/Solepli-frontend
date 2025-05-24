import axios from 'axios';
import { useSearchStore } from '../store/searchStore';

const accessToken = localStorage.getItem('accessToken');

// export const fetchRecentSearchWords = async () => {
//   await new Promise((res) => setTimeout(res, 500));
//   return mockRecentSearchWords;
// };

// export const deleteRecentSearchWords = async (keyword: string) => {
//   // 하드 코딩으로 mockRecentSearchWords의 검색어 삭제
//   mockRecentSearchWords = mockRecentSearchWords.filter((w) => w !== keyword);
//   return mockRecentSearchWords;
// };

export const deleteRecentSearchWords = async (
  mode: string,
  keyword: string
) => {
  try {
    const res = await axios.delete(
      `/api/api/${mode}/search/recent/${keyword}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

// let mockRecentSearchWords: string[] = ['강남구', '돈까스', '성수동'];

export const fetchRecentSearchWords = async (mode: string) => {
  try {
    const res = await axios.get(`/api/api/${mode}/search/recent`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(res.data.data);

    return res.data.data as string[];
  } catch (e) {
    console.log(e);
  }
};



export const postRecentSearchWord = async (inputValue: string, mode:string) => {
  try {
    const res = await axios.post(
      `/api/api/${mode}/search/recent`,
      { keyword: inputValue },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};
