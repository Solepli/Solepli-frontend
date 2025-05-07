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

import { AutoSearchResults } from '../../types';
import { formatDistance } from '../../utils/format';

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

interface AutoSearchProps {
  autoSearchData: AutoSearchResults;
}

const AutoSearch: React.FC<AutoSearchProps> = ({ autoSearchData }) => {
  const icon = iconMap[autoSearchData.category.id];

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <img
          className='w-24 h-24'
          src={icon}
          alt={autoSearchData.category.id}
        />
      </div>

      <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
        <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
          <div className="font-['Pretendard'] text-[14px] leading-[100%] font-[500] tracking-[-0.35px] text-center text-primary-900">
            {autoSearchData.title}
          </div>
        </div>

        <div className='flex justify-between items-center self-stretch'>
          {autoSearchData.address && (
            <div className="font-['Pretendard'] text-[12px] leading-[125%] tracking-[-0.18px] text-center text-primary-400">
              {autoSearchData.address}
            </div>
          )}
          {typeof autoSearchData.distance === 'number' && (
            <div className='flex items-center'>
              <div className="font-['Pretendard'] text-[12px] leading[125%] tracking-[-0.18px] text-center text-primary-400">
                {formatDistance(autoSearchData.distance)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoSearch;
