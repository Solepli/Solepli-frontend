import React from 'react';
import emojiGood from '../../../assets/emojiGood.svg';
import emojiBad from '../../../assets/emojiBad.svg';

const ReviewEmoji: React.FC = () => {
  return (
    <div className='self-stretch flex flex-col items-center justify-center pt-0 px-0 pb-[40px] border-[#eceef2] border-[0_0_1px]'>
      <div className='self-stretch flex flex-row items-center justify-center pt-0 px-0 pb-[8px]'>
        <div className="text-[14px] leading-[120%] tracking-[-0.35px] font-['Pretendard'] font-[600] text-[#343846] text-center whitespace-nowrap">
          혼자 또 방문할 의향이 있나요?
        </div>
      </div>
      <div className='self-stretch flex flex-row items-center justify-center gap-[12px]'>
        <div className='flex flex-row items-center justify-center p-[4px]'>
          <div className='p-[2px] w-[32px] h-[32px]'>
            <img
              className='w-[28px] h-[28px]'
              width='28'
              height='28'
              src={emojiGood}></img>
          </div>
        </div>
        <div className='flex flex-row items-center justify-center p-[4px]'>
          <div className='p-[2px] w-[32px] h-[32px]'>
            <img
              className='w-[28px] h-[28px]'
              width='28'
              height='28'
              src={emojiBad}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewEmoji;
