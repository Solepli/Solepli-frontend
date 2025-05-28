import { SollectPhotoType } from '../types';
import { publicAxios } from './axios';
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
  const params:any={};
  if(keyword) params.keyword = keyword;
  if(category) params.category = category;
  if(size !== undefined) params.size = size;
  if(cursorId !== undefined) params.cursorId = cursorId;

  try {
    const res = await publicAxios.get(ENDPOINT.SOLLECT_SEARCH, { params });
    console.log(res.data);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const mockSollects: SollectPhotoType[] = [
  {
    id: 1,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://i.pinimg.com/736x/01/f5/89/01f589cf7ccd3191ee2d55dc81d8fa82.jpg',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 2,
    title: '잠시 쉬어가는 시간',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://i.pinimg.com/736x/da/4b/bd/da4bbde3aede9fcf1fe487a392e3e4ec.jpg',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 3,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 4,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 5,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 6,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 7,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 8,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    placeTitle: '뺑 에 뵈르',
  },
];
