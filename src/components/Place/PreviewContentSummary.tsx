import React from 'react';
import SolmarkChip from '../BottomSheet/SolmarkChip';
import ReviewRange from '../BottomSheet/ReviewRange';
import TagList from '../BottomSheet/TagList';
import { placeSummary, SolroutePreviewSummary } from '../../types';
import SelectableChip from '../global/SelectableChip';
import { useNavigate } from 'react-router-dom';

interface SummaryProps {
  place: SolroutePreviewSummary | placeSummary;
  isMarked?: boolean;
  isSolroute?: boolean;
}

// { place }: placeSummary
const PreviewContentSummary: React.FC<SummaryProps> = ({
  place,
  isMarked,
  isSolroute = false,
}) => {
  const navigate = useNavigate();

  if (!place) {
    return;
  }

  const handleClick =()=>{
    //쏠루트일 경우는 detail로 이동하지 않음
    if (isSolroute) return;
    navigate(`/map/detail/${place.id}`);
  }
  return (
    <div
      className='w-full bg-white pt-12 pb-8 border-b border-primary-100'
      onClick={handleClick}>
      <div className='flex justify-between pb-8 px-16'>
        {/* left */}
        <div className='inline-flex items-center'>
          <span className='text-lg leading-relaxed text-primary-900 font-bold pr-4'>
            {place.name}
          </span>
          <span className='text-sm text-primary-400 pr-12'>
            {place.detailedCategory}
          </span>
        </div>

        {/* right */}
        {/* preview */}
        {!isSolroute ? (
          <SolmarkChip placeId={place.id} isMarked={isMarked} />
        ) : (
          //쏠루트에서 해당 컴포넌트를 호출할 때는 항상 SolroutePreviewSummary type을 받아야 함
          <SelectableChip place={place as SolroutePreviewSummary} />
        )}
      </div>

      <ReviewRange
        rating={place.rating}
        recommend={place.recommendationPercent}
        hasReviews={place.rating !== null}
      />

      <TagList tags={place.tags} />
    </div>
  );
};

export default PreviewContentSummary;
