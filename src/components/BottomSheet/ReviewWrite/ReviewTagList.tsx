import React from 'react';
import ReviewTag from './ReviewTag';
import { TagType } from '../../../types';

interface ReviewTagProps {
  title: string;
  tag: TagType[];
}

const ReviewTagList: React.FC<ReviewTagProps> = ({ title, tag }) => {
  return (
    <div className='flex flex-col gap-[6px] pt-[32px] px-[16px]'>
      <div className='flex flex-row items-center justify-start py-4'>
        <div className="text-[12px] leading-[120%] tracking-[-0.18px] font-['Pretendard'] font-[600] text-gray2-700 whitespace-nowrap">
          {title}
        </div>
      </div>
      <div className='self-stretch flex flex-wrap items-center justify-start gap-0'>
        {tag.map(({ id, text }) => {
          return (
            <div key={id} className='w-1/3'>
              <ReviewTag text={text} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewTagList;
