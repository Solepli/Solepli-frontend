import React from 'react';

import search from '../../assets/search.svg';

const SearchBar: React.FC = () => {
  return (
    <div
      className='shadow-[0_2px_2px_0_rgba(18,18,18,0.1)]
        h-34 flex-[1_0_0] flex items-center px-8 bg-[#fafafa] rounded-[12px]'>
      <div className='flex-1 flex items-center justify-start gap-4'>
        <img width='24' height='24' src={search}></img>
        <div className="flex-1 text-[14px] leading-[100%] tracking-[-0.21px] font-['Pretendard'] text-[#8691aa]">
          오늘은 어디서 시간을 보내나요?
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
