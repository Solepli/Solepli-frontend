import React from 'react';
import PreviewContent from './PreviewContent';
import { usePlaceStore } from '../../../store/placeStore';

const PreviewContentEmpty: React.FC = () => {
  const filteredPlaces = usePlaceStore((state) => state.filteredPlaces);
  return (
    <div>
      <div className='flex py-80 flex-col items-start'>
        <div className='flex px-16 flex-col justify-center items-center gap-4 self-stretch'>
          <div className='text-base font-bold leading-[120%] tracking-[-0.4px] text-center text-primary-900'>
            검색 결과를 찾지 못 했어요
          </div>
          <div>검색어를 다시 입력해주세요</div>
        </div>
      </div>
      <div className='flex pt-0 px-16 pb-16 items-center gap-10 self-stretch'>
        <div className='flex-1 h-1 bg-primary-100' />
        <div className='text-sm font-bold leading-[120%] tracking-[-0.21px] text-primary-900 text-center'>
          이런 장소는 어떠세요?
        </div>
        <div className='flex-1 h-1 bg-primary-100' />
      </div>

      <div>
        {filteredPlaces.map((place) => (
          <PreviewContent key={place.title} place={place} />
        ))}
      </div>
    </div>
  );
};

export default PreviewContentEmpty;
