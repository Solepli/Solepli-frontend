import React from 'react';

import ReviewEmoji from './ReviewEmoji';

import xButton from '../../../assets/xButton.svg';
import ReviewRatio from './ReviewRatio';

const ReviewWrite: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-start pt-0 px-0 pb-[300px] rounded-br-0 rounded-bl-0'>
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
    </div>
  );
};

export default ReviewWrite;
