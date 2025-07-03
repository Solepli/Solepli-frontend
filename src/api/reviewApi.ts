import { privateAxios, publicAxios } from './axios';
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

export const getReviews = async (id: number, cursorId?: number) => {
  try {
    const res = await publicAxios.get(ENDPOINT.SOLMAP_REVIEW.GET(id), {
      params: {
        cursorId,
      },
    });
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};
