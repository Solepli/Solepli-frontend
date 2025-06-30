import { API_URL } from './configs';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // solmap
  SOLMAP_MARKERS: '/api/solmap/markers',
  SOLMAP_MARKERS_REGION: (regionName: string) =>
    `/api/solmap/region/${regionName}/markers`,
  SOLMAP_MARKERS_ID_LIST: '/api/solmap/markers/search/related',

  SOLMAP_PLACE: '/api/solmap/places',
  SOLMAP_PLACE_REGION: (regionName: string) =>
    `/api/solmap/region/${regionName}/places`,
  SOLMAP_PLACE_ID_LIST: '/api/solmap/places/search/related',
  SOLMAP_PLACE_DETAIL: '/api/solmap/place/search/',
  SOLMAP_PLACE_NEARBY: '/api/solmap/places/nearby',

  RELATED_SEARCH: '/api/solmap/search/related',

  // solmap + sollect
  RECENT_SEARCH: {
    GET: (mode: string) => `/api/${mode}/search/recent`,
    POST: (mode: string) => `/api/${mode}/search/recent`,
    DELETE: (mode: string, keyword: string) =>
      `/api/${mode}/search/recent/${encodeURIComponent(keyword)}`,
  },

  // sollect
  SOLLECT_SEARCH: '/api/sollect/search',
  SOLLECT_RECOMMEND: '/api/sollect/recommend',
  SOLLECT_POPULAR: '/api/sollect/popular',
  SOLLECT: {
    POST: 'api/sollect',
    PUT: (id: number) => `/api/sollect/${id}`,
    DELETE: (id: number) => `/api/sollect/${id}`,
    GET: (id: number) => `/api/sollect/${id}`,
  },
  SOLLECT_UPLOAD: (id: number) => `/api/sollect/${id}/upload`,
  SOLLECT_RELATED: (id: number) => `/api/sollect/related/${id}`,

  // solmark
  SOLMARK_SOLLECT: '/api/solmark/sollect',
  
  SOLMARK_PLACE_COLLECTION: '/api/solmark/place/collections',                     // 리스트 조회
  SOLMARK_PLACE_COLLECTION_PLACES: (collectionId: number) =>
    `/api/solmark/place/collections/${collectionId}/places`,                      // 특정 컬렉션의 장소 리스트 조회
  SOLMARK_PLACE: (placeId:number)=>`/api/solmark/place/${placeId}/collections`,   // 장소 쏠마크 추가

  //login
  OAUTH_CALLBACK: (loginType: string) => `/api/auth/login/${loginType}`,
};
