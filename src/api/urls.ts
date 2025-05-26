import { API_URL } from './configs';

export const BASE_URL = API_URL;

export const ENDPOINT = {
  // solmap
  SOLMAP_MARKERS: '/api/solmap/markers',
  RECENT_SEARCH:{
    GET:(mode:string)=>`/api/${mode}/search/recent`,
    POST:(mode:string)=>`/api/${mode}/search/recent`,
    DELETE:(mode:string, keyword:string)=>`/api/${mode}/search/recent/${encodeURIComponent(keyword)}`,
  },
  SOLLECT_SEARCH:'/api/sollect/search',
};
