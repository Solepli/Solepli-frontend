import React from 'react';

import ReviewStars from './ReviewStars';

const ReviewRatio: React.FC = () => {
  return (
    <div className='self-stretch flex flex-col items-center justify-center pt-[32px] pb-[40px] border-primary-100 border-[0_0_1px]'>
      <div className='self-stretch flex flex-row items-center justify-center pb-[8px]'>
        <div className="text-base leading-[150%] font-semibold text-primary-900 whitespace-nowrap">
          이 장소에 대한 전반적인 만족도가 어떠셨나요?
        </div>
      </div>
      <ReviewStars />
    </div>
  );
};

export default ReviewRatio;
