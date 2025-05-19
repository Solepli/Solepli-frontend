import React from 'react';
import xBottonCircle from '../../assets/xButtonCircle.svg';
import ClockFill from '../../assets/clockFill.svg?react';

interface RecentSearchTextProps {
  text: string;
}

const RecentSearch: React.FC<RecentSearchTextProps> = ({ text }) => {
  return (
    <div className='flex pt-8 pl-12 pr-8 pb-0 items-center gap-10'>
      <div className='flex h-36 items-center gap-4 flex-[1_0_0] justify-start'>
        <div className='flex items-center gap-4 flex-[1_0_0]'>
          <ClockFill />
          <div className='flex-[1_0_0] text-[12px] leading-[120%] tracking-[-0.18px] text-primary-950'>
            {text}
          </div>
        </div>
        <div className='flex w-36 h-36 justify-center items-center self-stretch'>
          <img
            className='w-24 h-24 shrink-0 aspect-[1/1]'
            src={xBottonCircle}
            alt='xBottonCircle'
          />
        </div>
      </div>
    </div>
  );
};

export default RecentSearch;
