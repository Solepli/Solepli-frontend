import React from 'react';
import { usePlaceStore } from '../../../store/placeStore';
import RecommendedPreviewContentList from './RecommendedPreviewContentList';

const PreviewContentEmpty: React.FC = () => {
  const { recommendedPlaces } = usePlaceStore();

  return (
    <div>
      <div className='flex py-80 flex-col items-start'>
        <div className='flex px-16 flex-col justify-center items-center gap-4 self-stretch'>
          <p className='font-bold leading-[120%] tracking-[-0.4px] text-center text-primary-900'>
            검색 결과를 찾지 못 했어요
          </p>
          <p className='text-xs text-primary-900'>검색어를 다시 입력해주세요</p>
        </div>
      </div>

      {recommendedPlaces.length > 0 && <RecommendedPreviewContentList />}
    </div>
  );
};

export default PreviewContentEmpty;
