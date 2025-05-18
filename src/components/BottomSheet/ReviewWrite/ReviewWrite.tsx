import React from 'react';

import ReviewEmoji from './ReviewEmoji';

import xButton from '../../../assets/xButton.svg';
import ReviewRatio from './ReviewRatio';
import ReviewTagList from './ReviewTagList';
import { TagType } from '../../../types';
import ReviewInput from './ReviewInput';

const ReviewWrite: React.FC = () => {
  const mood: TagType[] = [
    { id: 'quiet', text: '조용한' },
    { id: 'lively', text: '시끌벅적한' },
    { id: 'cozy', text: '편안한' },
    { id: 'luxurious', text: '고급스러운' },
    { id: 'unique', text: '색다른' },
    { id: 'hip', text: '힙한' },
    { id: 'trendy', text: '트렌디한' },
    { id: 'nature-friendly', text: '자연친화적인' },
    { id: 'photo-worthy', text: '사진 찍기 좋은' },
    { id: 'great-view', text: '뷰가 좋은' },
  ];
  const single: TagType[] = [
    { id: 'single-seat', text: '1인 좌석이 있는' },
    { id: 'single-menu', text: '1인 메뉴가 있는' },
    { id: 'many-outlets', text: '콘센트가 많은' },
    { id: 'good-for-long-stay', text: '오래 머물기 좋은' },
    { id: 'good-for-quick-stop', text: '가볍게 들르기 좋은' },
    { id: 'good-in-daytime', text: '낮에 가기 좋은' },
    { id: 'good-at-night', text: '밤에 가기 좋은' },
    { id: 'spacious', text: '넓은' },
    { id: 'compact', text: '좁은' },
  ];

  return (
    <div className='flex flex-col items-start justify-start pb-300'>
      {/* content title */}
      <div className='self-stretch flex flex-row items-center justify-end pt-0 px-[16px] pb-[8px]'>
        <div className='w-[32px] h-[32px] shrink-0 flex flex-row items-center justify-center rounded-[8px]'>
          <img width='24' height='24' src={xButton}></img>
        </div>
      </div>

      {/* 방문 의향 체크 */}
      <ReviewEmoji />

      {/* 만족도 체크 */}
      <ReviewRatio />

      <div className='flex flex-col pb-32 border-gray-100 border-[0_0_1px]'>
        {/* 분위기 태그 */}
        <ReviewTagList title={'분위기'} tag={mood} />

        {/* 분위기 태그 */}
        <ReviewTagList title={'1인 이용'} tag={single} />
      </div>

      {/* 리뷰 글 작성 */}
      <ReviewInput />
    </div>
  );
};

export default ReviewWrite;
