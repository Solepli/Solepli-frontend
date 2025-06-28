import React from 'react';
import { useSollectDetailStore } from '../../store/sollectDetailStore';
import SolmarkChip from '../BottomSheet/SolmarkChip';
import ReviewRange from '../BottomSheet/ReviewRange';
import TagList from '../BottomSheet/TagList';
import { placeSummary } from '../../types';

interface SummaryProps{
  place:placeSummary
}

// { place }: placeSummary
const PreviewContentSummary:React.FC<SummaryProps> = ({place}) => {

  if (!place) {
    return;
  }

  return (
    <div className='w-full bg-white pt-12 pb-8 border-b border-primary-100'>
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
        <SolmarkChip />
      </div>

      <ReviewRange rating={place.rating} recommend={place.recommendationPercent}/>

      <TagList tags={place.tags.map(tag=>({id:tag, text:tag}))}/>
    </div>
  );
};

export default PreviewContentSummary;
