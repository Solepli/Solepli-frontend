import React from 'react';
import type { PlaceInfo } from '../../types';
import SelectableChip from '../global/SelectableChip';
import { iconNonlabelSearch } from '../../utils/icon';

interface RelatedSearchPlaceProps {
  place: PlaceInfo;
}

const RelatedSearchPlace: React.FC<RelatedSearchPlaceProps> = ({ place }) => {
  const Icon = iconNonlabelSearch[place.category!];

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      {/* 아이콘 */}
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <Icon />
      </div>

      <div className='flex flex-col items-start grow'>
        {/* 이름 */}
        <div className='flex flex-col items-start grow'>
          <div className='text-sm font-semibold leading-[150%] tracking-[-0.35px] text-start text-primary-950'>
            {place.name}
          </div>
        </div>
        {/* 주소 */}
        <div className='flex gap-8 justify-between items-center self-stretch'>
          <div className='text-xs leading-[120%] tracking-[-0.18px] text-start text-primary-400'>
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
