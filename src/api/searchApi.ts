import { RelatedSearchPlace } from '../types';
import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const getRelatedSearchWords = async (
  keyword: string,
  userLat: number,
  userLng: number
) => {
  try {
    const res = await privateAxios.get(ENDPOINT.RELATED_SEARCH, {
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

export const getRelatedSearchPlaces = async (
  //추후 keyword를 params로 받는 api 생성 예정
  keyword: string
) => {
  try {
    //keyword lint 문제로 일단 console 찍음. 추후 변경 예정
    console.log(keyword);
    return mockRelatedSearchPlaces;
  } catch (e) {
    console.error(e);
  }
};

export const deleteRecentSearchWords = async (
  mode: string,
  keyword: string
) => {
  try {
    await privateAxios.delete(ENDPOINT.RECENT_SEARCH.DELETE(mode, keyword));
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

const mockRelatedSearchPlaces: RelatedSearchPlace[] = [
  {
    id: 1,
    name: '솔플 카페',
    category: 'cafe',
    detailedCategory: '디저트 카페',
    address: '서울특별시 강남구 테헤란로 123',
    latitude: 37.501274,
    longitude: 127.039585,
  },
  {
    id: 2,
    name: '북촌 한옥마을',
    category: 'walk',
    detailedCategory: '역사 유적지',
    address: '서울특별시 종로구 계동길 37',
    latitude: 37.582604,
    longitude: 126.983998,
  },
  {
    id: 3,
    name: '남산 타워',
    category: 'walk',
    detailedCategory: '전망대',
    address: '서울특별시 용산구 남산공원길 105',
    latitude: 37.551169,
    longitude: 126.988227,
  },
  {
    id: 4,
    name: '을지로 노포 식당',
    category: 'food',
    detailedCategory: '한식',
    address: '서울특별시 중구 을지로 15길 8',
    latitude: 37.566295,
    longitude: 126.991771,
  },
  {
    id: 5,
    name: '제주 자연사 박물관',
    category: 'culture',
    detailedCategory: '박물관',
    address: '제주특별자치도 제주시 일도이동 996-1',
    latitude: 33.49962,
    longitude: 126.531188,
  },
  {
    id: 6,
    name: '해운대 해수욕장',
    category: 'walk',
    detailedCategory: '해변',
    address: '부산광역시 해운대구 우동',
    latitude: 35.158698,
    longitude: 129.160384,
  },
  {
    id: 7,
    name: '동대문 디자인 플라자',
    category: 'culture',
    detailedCategory: '문화 공간',
    address: '서울특별시 중구 을지로 281',
    latitude: 37.566347,
    longitude: 127.009123,
  },
  {
    id: 8,
    name: '잠실 롯데월드',
    category: 'entertainment',
    detailedCategory: '테마파크',
    address: '서울특별시 송파구 올림픽로 240',
    latitude: 37.511034,
    longitude: 127.098122,
  },
  {
    id: 9,
    name: '광안리 해변',
    category: 'walk',
    detailedCategory: '해변',
    address: '부산광역시 수영구 광안해변로 219',
    latitude: 35.153121,
    longitude: 129.118576,
  },
  {
    id: 10,
    name: '이태원 빈티지 거리',
    category: 'shop',
    detailedCategory: '빈티지숍',
    address: '서울특별시 용산구 이태원로 200',
    latitude: 37.534611,
    longitude: 126.994756,
  },
];
