import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const postReview = async (formData: FormData) => {
  try {
    const res = await privateAxios.post(ENDPOINT.SOLMAP_REVIEW.POST, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (e: any) {
    console.error('Error posting review:', e);
    throw new Error(e.response ? e.response.data.message : String(e));
  }
};