import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const fetchProfile = async () => {
  try {
    const res = await privateAxios.post(ENDPOINT.PROFILE);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
