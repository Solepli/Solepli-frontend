import React from 'react';
import TitleHeader from '../components/global/TitleHeader';
import { useNavigate } from 'react-router-dom';
import SollectPhoto from '../components/Sollect/SollectPhoto';

const RelatedSollect = () => {
  const navigate = useNavigate();
  const sollectData = [
    {
      id: 1,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    },
    {
      id: 2,
      title: '잠시 쉬어가는 시간',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    },
    {
      id: 3,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    },
    {
      id: 4,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    },
    {
      id: 5,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://cdn.imweb.me/upload/S202207276eb21328c800f/0d1de28381aef.jpg',
    },
    {
      id: 6,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    },
    {
      id: 7,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    },
    {
      id: 8,
      title: '성수동 혼놀 코스',
      address: '성동구, 성수동2가',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH8HvHrjwd0T3122vCeMXg79UAWqixsmLBLVEoQol3KlaZEsY4_LrR1sLtcWYqGdjIciA&usqp=CAU',
    },
  ];
  return (
    <div>
      <TitleHeader title='관련 쏠렉트' onClick={() => navigate(-1)} />
    
      <div className='flex flex-wrap gap-12 justify-center pt-58'>
        {sollectData.map((sollect) => {
          return <SollectPhoto sollect={sollect} />;
        })}
      </div>
    </div>
  );
};

export default RelatedSollect;
