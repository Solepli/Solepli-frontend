import React from 'react';

import xButton from '../../../assets/xButton.svg';

const ReviewWrite: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-start pt-0 px-0 pb-[300px] bg-[#ef2d2d] rounded-br-0 rounded-bl-0'>
      <div className='self-stretch flex flex-row items-center justify-end pt-0 px-[16px] pb-[8px] bg-[#ffdcdc] '>
        <div className='w-[32px] h-[32px] shrink-0 flex flex-row items-center justify-center bg-[#eceef2] rounded-[8px]'>
          <img width='24' height='24' src={xButton}></img>
        </div>
      </div>
    </div>
  );
};

export default ReviewWrite;
