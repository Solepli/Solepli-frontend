import React from 'react';

import ReviewStars from './ReviewStars';

const ReviewRatio: React.FC = () => {
  return (
    <div className='self-stretch flex flex-col items-center justify-center pt-[32px] pb-[40px] border-[#eceef2] border-[0_0_1px]'>
      <div className='self-stretch flex flex-row items-center justify-center pb-[8px]'>
        <div className="text-[14px] leading-[120%] tracking-[-0.03em] font-['Pretendard'] font-[600] text-[#343846] whitespace-nowrap">
          이 장소에 대한 전반적인 만족도가 어떠셨나요?
        </div>
      </div>
      <ReviewStars />
    </div>
  );
};

export default ReviewRatio;
