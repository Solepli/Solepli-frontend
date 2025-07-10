import { Paragraph } from '../types';
import { privateAxios } from './axios';
import { ENDPOINT } from './urls';

export const searchSollect = async (
  keyword?: string,
  category?: string,
  size?: number,
  cursorId?: number
) => {

  try {
    const res = await privateAxios.get(ENDPOINT.SOLLECT_SEARCH, {
      params: {
        keyword,
        category,
        size,
        cursorId,
      },
    });
    return res.data.data.contents;
  } catch (e) {
    console.log(e);
  }
};

export const postSollect = async (data: {
  title: string | null;
  contents: (Paragraph | null)[];
  placeIds: (number | null)[];
}) => {
  try {
    const res = await privateAxios.post(ENDPOINT.SOLLECT.POST, data);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const putSollect = async (id: number, data: {
  title: string | null;
  contents: (Paragraph | null)[];
  placeIds: (number | null)[];
}) => {
  try {
    const res = await privateAxios.put(ENDPOINT.SOLLECT.PUT(id), data);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postSollectUpload = async (id: number, formData: FormData) => {
  try {
    const res = await privateAxios.post(ENDPOINT.SOLLECT_UPLOAD(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const postSolmarkSollect = async (id: number) => {
  try {
    const res = await privateAxios.post(ENDPOINT.SOLMARK_SOLLECT + `/${id}`);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const deleteSolmarkSollect = async (id: number) => {
  try {
    const res = await privateAxios.delete(ENDPOINT.SOLMARK_SOLLECT + `/${id}`);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const fetchPopularSollect = async () => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLLECT_POPULAR);
    console.log(res);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchRecommendSollect = async (
  keyword: string,
  categoryName: string
) => {
  const params = {
    keyword: keyword,
    categoryName: categoryName,
  };

  try {
      const res = await privateAxios.get(ENDPOINT.SOLLECT_RECOMMEND, { params });  
      return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchRelatedSollect = async (
  placeId: number,
  cursorId?: number
) => {
  try {
    const params = {
      cursorId: cursorId,
    };
    const res = await privateAxios.get(ENDPOINT.SOLLECT_RELATED(placeId), {
      params,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchSollectDetail = async (sollectId: number) => {
  try {
    const res = await privateAxios.get(ENDPOINT.SOLLECT.GET(sollectId));
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSollect = async (sollectId: number) => {
  // test 안해봄
  try {
    const res = await privateAxios.delete(ENDPOINT.SOLLECT.DELETE(sollectId));
    console.log(res);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

