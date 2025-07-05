import { SolroutePreviewSummary } from '../types';
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
    // const res = await privateAxios.get(
    //   ENDPOINT.SOLMARK_PLACE_COLLECTION_PLACES(collectionId)
    // );
    // console.log(res.data.data.places);
    // return res.data.data.places;
    console.log(collectionId);
    return mockSolroutePreviewSummaries;
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
    console.log(res.data.data.contents);
    return res.data.data.contents;
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

export const mockSolroutePreviewSummaries: SolroutePreviewSummary[] = [
  {
    id: 1,
    name: "솔플 카페",
    category: "cafe",
    detailedCategory: "디저트 카페",
    address: "서울특별시 강남구 테헤란로 123",
    latitude: 37.501274,
    longitude: 127.039585,
    recommendationPercent: 53,
    tags: ["역사탐방", "포토존", "맛집"],
    rating: 3.4,
  },
  {
    id: 2,
    name: "북촌 한옥마을",
    category: "walk",
    detailedCategory: "역사 유적지",
    address: "서울특별시 종로구 계동길 37",
    latitude: 37.582604,
    longitude: 126.983998,
    recommendationPercent: 78,
    tags: ["역사탐방", "혼밥", "맛집"],
    rating: 3.9,
  },
  {
    id: 3,
    name: "남산 타워",
    category: "walk",
    detailedCategory: "전망대",
    address: "서울특별시 용산구 남산공원길 105",
    latitude: 37.551169,
    longitude: 126.988227,
    recommendationPercent: 56,
    tags: ["힐링", "혼밥", "맛집"],
    rating: 4.7,
  },
  {
    id: 4,
    name: "을지로 노포 식당",
    category: "food",
    detailedCategory: "한식",
    address: "서울특별시 중구 을지로 15길 8",
    latitude: 37.566295,
    longitude: 126.991771,
    recommendationPercent: 80,
    tags: ["혼자여행", "포토존", "역사탐방"],
    rating: 4.6,
  },
  {
    id: 5,
    name: "제주 자연사 박물관",
    category: "culture",
    detailedCategory: "박물관",
    address: "제주특별자치도 제주시 일도이동 996-1",
    latitude: 33.49962,
    longitude: 126.531188,
    recommendationPercent: 61,
    tags: ["뷰맛집", "산책하기좋은", "역사탐방"],
    rating: 2.9,
  },
  {
    id: 6,
    name: "해운대 해수욕장",
    category: "walk",
    detailedCategory: "해변",
    address: "부산광역시 해운대구 우동",
    latitude: 35.158698,
    longitude: 129.160384,
    recommendationPercent: 67,
    tags: ["힐링", "조용한", "혼자여행"],
    rating: 4.2,
  },
  {
    id: 7,
    name: "동대문 디자인 플라자",
    category: "culture",
    detailedCategory: "문화 공간",
    address: "서울특별시 중구 을지로 281",
    latitude: 37.566347,
    longitude: 127.009123,
    recommendationPercent: 85,
    tags: ["포토존", "데이트", "조용한"],
    rating: 3.7,
  },
  {
    id: 8,
    name: "잠실 롯데월드",
    category: "entertainment",
    detailedCategory: "테마파크",
    address: "서울특별시 송파구 올림픽로 240",
    latitude: 37.511034,
    longitude: 127.098122,
    recommendationPercent: 74,
    tags: ["힐링", "포토존", "맛집"],
    rating: 4.8,
  },
  {
    id: 9,
    name: "광안리 해변",
    category: "walk",
    detailedCategory: "해변",
    address: "부산광역시 수영구 광안해변로 219",
    latitude: 35.153121,
    longitude: 129.118576,
    recommendationPercent: 88,
    tags: ["뷰맛집", "조용한", "산책하기좋은"],
    rating: 4.4,
  },
  {
    id: 10,
    name: "이태원 빈티지 거리",
    category: "shop",
    detailedCategory: "빈티지숍",
    address: "서울특별시 용산구 이태원로 200",
    latitude: 37.534611,
    longitude: 126.994756,
    recommendationPercent: 62,
    tags: ["혼자여행", "포토존", "맛집"],
    rating: 3.6,
  },
];