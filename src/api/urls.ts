import { API_URL } from './configs';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // solmap
  SOLMAP_MARKERS: '/api/solmap/markers',
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

  // solmark
  SOLMARK_SOLLECT: '/api/solmark/sollect',

  POPULAR_SOLLECT: '/api/sollect/popular',
};
