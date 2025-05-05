import React from 'react';
import xBottonCircle from '../../assets/x-button-circle.svg';

interface RecentSearchTextProps {
  text: string;
}

const RecentSearch: React.FC<RecentSearchTextProps> = ({ text }) => {
  return (
    <div className='self-stretch flex items-center p-[12px_16px_0px_16px]'>
      <div className='flex items-center gap-4 flex-[1_0_0]'>
        <div className="flex-[1_0_0] text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] text-black">
          {text}
        </div>
        <img className='w-24 h-24' src={xBottonCircle} alt='xBottonCircle' />
      </div>
    </div>
  );
};

export default RecentSearch;
