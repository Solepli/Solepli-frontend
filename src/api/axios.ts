import axios from 'axios';
import { BASE_URL } from './urls';

// 인증 필요 x
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});
