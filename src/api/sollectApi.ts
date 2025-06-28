import { Paragraph, SollectPhotoType } from '../types';
import { privateAxios, publicAxios } from './axios';
import { ENDPOINT } from './urls';

export const fetchSollects = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockSollects;
};

export const searchSollect = async (
  keyword?: string,
  category?: string,
  size?: number,
  cursorId?: number
) => {
  const params: any = {};
  if (keyword) params.keyword = keyword;
  if (category) params.category = category;
  if (size !== undefined) params.size = size;
  if (cursorId !== undefined) params.cursorId = cursorId;

  try {
    const res = await publicAxios.get(ENDPOINT.SOLLECT_SEARCH, { params });
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
    const res = await publicAxios.get(ENDPOINT.SOLLECT_POPULAR);
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
    const res = await publicAxios.get(ENDPOINT.SOLLECT_RECOMMEND, { params });
    console.log(res);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};


export const fetchSollectDetail = async(sollectId:number)=>{
  try{
    const res = await publicAxios.get(ENDPOINT.SOLLECT.GET(sollectId));
    return res.data.data;
  }catch(e){
    console.log(e);
  }
};

export const deleteSollect = async(sollectId:number)=>{
  // test 안해봄
  try{
    const res = await privateAxios.get(ENDPOINT.SOLLECT.DELETE(sollectId));
    console.log(res);
    return res.data.data;
  }catch(e){
    console.log(e);
  }
}

const mockSollects: SollectPhotoType[] = [
  {
    sollectId: 1,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/01/f5/89/01f589cf7ccd3191ee2d55dc81d8fa82.jpg',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 2,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/da/4b/bd/da4bbde3aede9fcf1fe487a392e3e4ec.jpg',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 3,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/01/f5/89/01f589cf7ccd3191ee2d55dc81d8fa82.jpg',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 4,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 5,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/da/4b/bd/da4bbde3aede9fcf1fe487a392e3e4ec.jpg',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 6,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/01/f5/89/01f589cf7ccd3191ee2d55dc81d8fa82.jpg',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 7,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    isMarked: false,
    placeName: '',
  },
  {
    sollectId: 8,
    title: '성수동 혼놀 코스',
    district: '성동구',
    neighborhood: '성수동2가',
    thumbnailImage:
      'https://i.pinimg.com/736x/01/f5/89/01f589cf7ccd3191ee2d55dc81d8fa82.jpg',
    isMarked: false,
    placeName: '',
  },
];
