import React from 'react';
import type { PlaceInfo } from '../../types';
import SelectableChip from '../global/SelectableChip';
import { iconRelatedSearch } from '../../utils/icon';

interface RelatedSearchPlaceProps {
  place: PlaceInfo;
}

const RelatedSearchPlace: React.FC<RelatedSearchPlaceProps> = ({ place }) => {
  const Icon = iconRelatedSearch[place.category!];

  return (
    <div className='flex p-[16px_16px_4px_16px] items-center gap-10 self-stretch'>
      {/* 아이콘 */}
      <div className='flex p-4 items-start rounded-[4px] bg-gray-400/10'>
        <Icon />
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
