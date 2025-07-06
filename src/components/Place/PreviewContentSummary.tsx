import React from 'react';
import SolmarkChip from '../BottomSheet/SolmarkChip';
import ReviewRange from '../BottomSheet/ReviewRange';
import TagList from '../BottomSheet/TagList';
import { placeSummary } from '../../types';
import { useNavigate } from 'react-router-dom';

interface SummaryProps {
  place: placeSummary;
  isMarked?: boolean;
}

// { place }: placeSummary
const PreviewContentSummary: React.FC<SummaryProps> = ({ place, isMarked }) => {
  const navigate = useNavigate();

  if (!place) {
    return;
  }

  const handleClick =()=>{
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
        <SolmarkChip placeId={place.id} isMarked={isMarked} />
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
