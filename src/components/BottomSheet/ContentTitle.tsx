import React from 'react';
import SolmarkChip from './SolmarkChip';
import { Place } from '../../types';
import location from "../../assets/location.svg";
import clock from "../../assets/clock.svg";

interface ContentTitleProps {
  place: Place;
  property: 'preview' | 'detail';
}

const ContentTitle: React.FC<ContentTitleProps> = ({ place, property }) => {
  const isPreview = property === 'preview';
  const isDetail = property === 'detail';

  return (
    <div>
      <div className='flex justify-between pb-8'>
        <div className='inline-flex items-center'>
          <span className='text-base text-gray-900 font-bold pr-4'>
            {place.title}
          </span>
          <span className='text-xs text-gray-400 pr-10'>
            {place.category.title}
          </span>
          {isPreview && (
            <span className='text-xs text-gray-900 font-semibold'>영업 중</span>
          )}
        </div>

        {/* right */}
        {isPreview && <SolmarkChip />}
        {isDetail && (
          <div className='flex gap-8'>
            <SolmarkChip />
            <div className='w-32 h-32 border border-gray-400 rounded-lg'></div>
            <div className='w-32 h-32 bg-gray-100 rounded-lg'></div>
          </div>
        )}
      </div>

      {isDetail && (
        <div className='text-gray-900 text-xs pb-12 border-b mb-12 border-gray-100'>
          <div className='flex items-center'><img src={location} alt="" /><p>주소</p></div>
          <div className='flex items-center'><img src={clock} alt="" /><p>시간</p></div>
        </div>
      )}
    </div>
  );
};

export default ContentTitle;
