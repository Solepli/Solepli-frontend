import React from 'react';
import food from '../../assets/category-icons/foodFill.svg';
import cafe from '../../assets/category-icons/cafeFill.svg';
import drink from '../../assets/category-icons/drinkFill.svg';
import entertainment from '../../assets/category-icons/entertainmentFill.svg';
import culture from '../../assets/category-icons/cultureFill.svg';
import shop from '../../assets/category-icons/shopFill.svg';
import walk from '../../assets/category-icons/walkFill.svg';
import work from '../../assets/category-icons/workFill.svg';
import location from '../../assets/locationFill.svg';
import Add from '../../assets/addIcon.svg?react';
import { RelatedSearchWord } from '../../types';

const iconMap: Record<string, string> = {
  food,
  cafe,
  drink,
  entertainment,
  culture,
  shop,
  walk,
  work,
  location,
};

interface RelatedSearchPlaceProps {
  relatedSearchWord: RelatedSearchWord;
}

const RelatedSearchPlace: React.FC<RelatedSearchPlaceProps> = ({
  relatedSearchWord,
}) => {
  const icon =
    relatedSearchWord.type === 'PLACE'
      ? iconMap[relatedSearchWord.category!]
      : location;

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <img
          className='w-24 h-24'
          src={icon}
          alt={relatedSearchWord.type + relatedSearchWord.category}
        />
      </div>

      <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
        <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
          <div className='text-[14px] leading-[100%] font-[500] tracking-[-0.35px] text-center text-primary-950'>
            {relatedSearchWord.name}
          </div>
        </div>
        {/* 위치 */}
        <div className='flex justify-between items-center self-stretch'>
          <div className='text-[12px] leading-[120%] tracking-[-0.18px] text-center text-primary-400'>
            {relatedSearchWord.address}
          </div>
          <div className='flex items-center'></div>
        </div>
      </div>
      <div className='w-49 h-22 pl-4 pr-8 py-3 bg-primary-100 rounded-lg inline-flex justify-start items-center'>
        <Add className='w-16 h-16 text-primary-600' />
        <div className="text-center justify-start text-primary-600 text-xs font-semibold font-['Pretendard'] leading-none">
          추가
        </div>
      </div>
    </div>
  );
};

export default RelatedSearchPlace;
