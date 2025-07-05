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
import type { PlaceInfo } from '../../types';
import SelectableChip from '../global/SelectableChip';

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
  place: PlaceInfo;
}

const RelatedSearchPlace: React.FC<RelatedSearchPlaceProps> = ({ place }) => {
  const icon = iconMap[place.category!];

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      {/* 아이콘 */}
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <img className='w-24 h-24' src={icon} alt={place.category} />
      </div>

      {/* 이름 */}
      <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
        <div className='flex flex-col items-start gap-4 flex-[1_0_0]'>
          <div className='text-[14px] leading-[100%] font-[500] tracking-[-0.35px] text-center text-primary-950'>
            {place.name}
          </div>
        </div>
        {/* 위치 */}
        <div className='flex justify-between items-center self-stretch'>
          <div className='text-[12px] leading-[120%] tracking-[-0.18px] text-center text-primary-400'>
            {place.address}
          </div>
          <div className='flex items-center'></div>
        </div>
      </div>
      {/* 추가 버튼 */}
      <SelectableChip place={place} />
    </div>
  );
};

export default RelatedSearchPlace;
