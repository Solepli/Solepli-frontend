import React from 'react';

interface ReviewTagProps {
  text: string;
}

const ReviewTag: React.FC<ReviewTagProps> = ({ text }) => {
  return (
    <div className='min-w-[120px] flex flex-row items-center justify-center py-[10px] px-[8px] border-[1px] border-solid border-[#eceef2] rounded-[4px]'>
      <div className="text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] text-[#343846] whitespace-nowrap">
        #
      </div>
      <div className="text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] text-[#343846] whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default ReviewTag;
