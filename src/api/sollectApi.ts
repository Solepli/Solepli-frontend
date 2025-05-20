import { SollectPhotoType } from '../types';

export const fetchSollects = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockSollects;
};

const mockSollects: SollectPhotoType[] = [
  {
    id: 1,
    title: '성수동 혼놀 코스',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    placeTitle: '뺑 에 뵈르',
  },
  {
    id: 2,
    title: '잠시 쉬어가는 시간',
    address: '성동구, 성수동2가',
    imageUrl:
      'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
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
